import { Module } from '@nestjs/common';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { BlogPostService } from './blog-post-service';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [BlogPostsController],
  providers: [BlogPostService],
  exports: [BlogPostService],
  imports: [SharedModule],
})
export class BlogModule {}
