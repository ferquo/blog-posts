import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database-service';

@Injectable()
export class BlogPostService {
  constructor(private databaseService: DatabaseService) {}

  async getBlogPosts() {
    return await this.databaseService.get();
  }

  async createBlogPost() {
    // return this.databaseService.
  }
}
