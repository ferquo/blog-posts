import { Controller, Req, Res, Get, Post, Body, HttpStatus, Param, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { BlogPostService } from '../blog-post-service';
import { GetBlogPostModel } from '../../models/viewmodel/get-blog-post-model';
import { CreateBlogPostModel } from '../../models/viewmodel/create-blog-post-model';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private blogPostService: BlogPostService) {}

  @Get()
  async getBlogPosts(@Req() req: Request, @Res() res: Response, @Query() query: any) {
    const response = await this.blogPostService.getBlogPosts(query);
    const responseStatusCode = response.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT;
    res.status(responseStatusCode).json(response);
  }

  @Post()
  async createBlogPost(
    @Req() req: Request,
    @Res() res: Response,
    @Body() newBlogPost: CreateBlogPostModel,
  ) {
    const response: GetBlogPostModel = await this.blogPostService.createBlogPost(
      newBlogPost,
    );
    res.status(HttpStatus.CREATED).json(response);
  }

  @Get(':id')
  async getBlogPostById(@Req() req: Request, @Res() res: Response, @Param('id') blogPostId: string) {
    const response = await this.blogPostService.getBlogPostById(blogPostId);
    res.json(response);
  }
}
