import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostService } from './blog-post-service';
import { DatabaseService } from '../shared/database-service';

jest.mock('../shared/database-service.ts');

describe('BlogPostService', () => {
  let blogPostService: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostService, DatabaseService],
    }).compile();

    blogPostService = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () => {
    expect(blogPostService).toBeDefined();
  });

  // describe('getBlogPosts', () => {

  // });

  // describe('createBlogPost', () => {});

  // describe('getBlogPostById', () => {});

  // describe('updateBlogPostByIdPatch', () => {});

  // describe('deleteBlogPostById', () => {});
});
