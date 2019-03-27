import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostService } from './blog-post-service';
import { DatabaseService } from '../shared/database-service';

jest.mock('../shared/database-service.ts');

describe('BlogPostService', () => {
  let provider: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostService, DatabaseService],
    }).compile();

    provider = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
