import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostService } from '../blog-post-service';
// tslint:disable-next-line: no-var-requires
const mockRes = require('jest-mock-express').response;
jest.mock(
  '../blog-post-service.ts',
);

describe('BlogPosts Controller', () => {
  let controller: BlogPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [BlogPostService],
    }).compile();

    controller = module.get<BlogPostsController>(BlogPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
