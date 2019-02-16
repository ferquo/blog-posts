import { Controller, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { BlogPostService } from '../blog-post-service';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private blogPostService: BlogPostService) {}

  @Get()
  async getBlogPosts(@Req() req: Request, @Res() res: Response) {
    const response = await this.blogPostService.getBlogPosts();
    res.json(response);
  }
}
