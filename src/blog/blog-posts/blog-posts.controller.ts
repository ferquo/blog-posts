import { Controller, Req, Res, Get, Post, Body, HttpStatus, Param, Query, Patch, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { BlogPostService } from '../blog-post-service';
import { GetBlogPostModel } from '../../models/viewmodel/get-blog-post-model';
import { CreateBlogPostModel } from '../../models/viewmodel/create-blog-post-model';
import { Operation } from 'fast-json-patch';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private blogPostService: BlogPostService) {}

  @Get()
  async getBlogPosts(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
  ) {
    const response = await this.blogPostService.getBlogPosts(query);
    const responseStatusCode =
      response.blogPosts.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT;
    res.status(responseStatusCode).json(response);
  }

  @Post()
  async createBlogPost(
    @Res() res: Response,
    @Body() newBlogPost: CreateBlogPostModel,
  ) {
    const response: GetBlogPostModel = await this.blogPostService.createBlogPost(
      newBlogPost,
    );
    res.status(HttpStatus.CREATED).json(response);
  }

  @Get(':id')
  async getBlogPostById(@Res() res: Response, @Param('id') blogPostId: string) {
    const response = await this.blogPostService.getBlogPostById(blogPostId);
    res.json(response);
  }

  @Patch(':id')
  async updateBlogPostByIdPatch(
    @Res() res: Response,
    @Param('id') blogPostId: string,
    @Body() jsonPatchOperations: Operation[],
  ) {
    const response = await this.blogPostService.updateBlogPostByIdPatch(
      blogPostId,
      jsonPatchOperations,
    );
    res.json(response);
  }

  @Delete(':id')
  async deleteBlogPostById(
    @Res() res: Response,
    @Param('id') blogPostId: string,
  ) {
    await this.blogPostService.deleteBlogPostById(blogPostId);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
