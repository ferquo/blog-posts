import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostService } from './blog-post-service';

describe('BlogPostService', () => {
  let provider: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostService],
    }).compile();

    provider = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
