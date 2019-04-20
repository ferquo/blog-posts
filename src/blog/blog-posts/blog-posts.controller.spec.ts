import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostService } from '../blog-post-service';
import { GetBlogPostModel } from '../../models/viewmodel/get-blog-post-model';
import { NotFoundException } from '@nestjs/common';
import { CreateBlogPostModel } from '../../models/viewmodel/create-blog-post-model';
import { ValidationErrorException } from '../../shared/exceptions/validation-error.exception';
import { RecordNotFoundException } from '../../shared/exceptions/record-not-found.exception';
// tslint:disable-next-line: no-var-requires
const mockResponse = require('jest-mock-express').response;

jest.mock('../blog-post-service');

describe('BlogPosts Controller', () =>
{
  let controller: BlogPostsController;
  let blogPostService: BlogPostService;
  const headers = { host: 'localhost:3333' };

  beforeEach(async () =>
  {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [BlogPostService],
    }).compile();

    controller = module.get<BlogPostsController>(BlogPostsController);
    blogPostService = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () =>
  {
    expect(controller).toBeDefined();
  });

  describe('GET getBlogPostById', () =>
  {
    it('should get an existing blog post', async () =>
    {
      const expectedResult = new GetBlogPostModel({
        id: 'existing-blog-post',
        title: 'Expected Title',
        content: 'Expected content',
      });
      const res = mockResponse();

      await controller.getBlogPostById(res, 'existing-blog-post', headers);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toBeCalledWith(expectedResult);
    });

    it('should fail on requesting an unexisting blog post', async () =>
    {
      const res = mockResponse();

      expect(
        controller.getBlogPostById(res, 'not-existing-blog-post', headers),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('POST createBlogPost', () =>
  {
    it('should create a blog post', async () => {
      const newBlogPost = new CreateBlogPostModel({
        title: 'New title',
        content: 'New Content',
      });
      const expectedResult = new GetBlogPostModel({
        id: 'new_id',
        title: 'New title',
        content: 'New Content',
      });

      const res = mockResponse();

      await controller.createBlogPost(res, newBlogPost);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toBeCalledWith(expectedResult);
    });

    it('should not create a blog post, when title is not specified', async () => {
      const newBlogPost = new CreateBlogPostModel({
        content: 'New Content',
      });

      const res = mockResponse();

      expect(controller.createBlogPost(res, newBlogPost)).rejects.toThrowError(
        ValidationErrorException,
      );

      expect(res.json).not.toHaveBeenCalled();
    });

    it('should not create a blog post, when content is not specified', async () => {
      const newBlogPost = new CreateBlogPostModel({
        title: 'New title',
      });

      const res = mockResponse();

      expect(controller.createBlogPost(res, newBlogPost)).rejects.toThrowError(
        ValidationErrorException,
      );

      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('DELETE deleteBlogPostById', () => {
    it('should remove an existing blog post', async () => {
      const blogPostId = 'existing-blog-post';

      const res = mockResponse();

      await controller.deleteBlogPostById(res, blogPostId);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(204);
    });

    it('should throw error when trying to remove a non existing blog post', async () => {
      const blogPostId = 'non-existing-blog-post';

      const res = mockResponse();

      expect(
        controller.deleteBlogPostById(res, blogPostId),
      ).rejects.toThrowError(RecordNotFoundException);

      expect(res.send).not.toHaveBeenCalled();
    });
  });
});
