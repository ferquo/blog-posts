import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostService } from '../blog-post-service';
import { GetBlogPostModel } from '../../models/viewmodel/get-blog-post-model';
import { NotFoundException } from '@nestjs/common';
import { CreateBlogPostModel } from '../../models/viewmodel/create-blog-post-model';
import { ValidationErrorException } from '../../shared/exceptions/validation-error.exception';
// tslint:disable-next-line: no-var-requires
const mockResponse = require('jest-mock-express').response;

jest.mock('../blog-post-service');

describe('BlogPosts Controller', () => {
  let controller: BlogPostsController;
  let blogPostService: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [BlogPostService],
    }).compile();

    controller = module.get<BlogPostsController>(BlogPostsController);
    blogPostService = module.get<BlogPostService>(BlogPostService);;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get an existing blog post', async () => {
    const expectedResult = new GetBlogPostModel()
    expectedResult.id = 'existing-blog-post';
    expectedResult.title = 'Expected Title';
    expectedResult.content = 'Expected content';
    const res = mockResponse();

    await controller.getBlogPostById(res, 'existing-blog-post');

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toBeCalledWith(expectedResult);
  });

  it('should fail on requesting an unexisting blog post', async () => {
    const res = mockResponse();

    expect(
      controller.getBlogPostById(res, 'not-existing-blog-post'),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should create a blog post', async () => {
    const newBlogPost = new CreateBlogPostModel();
    const expectedResult = new GetBlogPostModel();
    newBlogPost.title = expectedResult.title = 'New title';
    newBlogPost.content = expectedResult.content = 'New Content';
    expectedResult.id = 'new_id';

    const res = mockResponse();

    await controller.createBlogPost(res, newBlogPost);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toBeCalledWith(expectedResult);
  });

  it('should not create a blog post, when title is not specified', async () => {
    const newBlogPost = new CreateBlogPostModel();
    const expectedResult = new GetBlogPostModel();

    newBlogPost.content = expectedResult.content = 'New Content';
    expectedResult.id = 'new_id';

    const res = mockResponse();

    expect(
      controller.createBlogPost(res, newBlogPost),
    ).rejects.toThrowError(ValidationErrorException);

    expect(res.json).not.toHaveBeenCalled();
  });

  it('should not create a blog post, when content is not specified', async () => {
    const newBlogPost = new CreateBlogPostModel();
    const expectedResult = new GetBlogPostModel();

    newBlogPost.title = expectedResult.title = 'New title';

    expectedResult.id = 'new_id';

    const res = mockResponse();

    expect(controller.createBlogPost(res, newBlogPost)).rejects.toThrowError(
      ValidationErrorException,
    );

    expect(res.json).not.toHaveBeenCalled();
  });
});
