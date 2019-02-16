import { Controller, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('blog-posts')
export class BlogPostsController {
  @Get()
  async getBlogPosts(@Req() req: Request, @Res() res: Response) {
    res.json({ message: 'hello world!' });
  }
}
