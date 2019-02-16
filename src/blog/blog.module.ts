import { Module } from '@nestjs/common';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { BlogPostService } from './blog-post-service';

@Module({
  controllers: [BlogPostsController],
  providers: [BlogPostService],
})
export class BlogModule {}
