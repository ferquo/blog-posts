import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database-service';
import { BlogPostModel } from '../models/database/blog-post-model';
import { CreateBlogPostModel } from '../models/viewmodel/create-blog-post-model';
import { GetBlogPostModel } from '../models/viewmodel/get-blog-post-model';

@Injectable()
export class BlogPostService {
  constructor(private databaseService: DatabaseService) {}

  async getBlogPosts() {
    return await this.databaseService.get();
  }

  async createBlogPost(
    blogPost: CreateBlogPostModel,
  ): Promise<GetBlogPostModel> {
    const blogpostDataModel = new BlogPostModel();
    blogpostDataModel.title = blogPost.title;
    blogpostDataModel.content = blogPost.content;
    blogpostDataModel.createdOnDate = blogpostDataModel.updatedOnDate = new Date();
    blogpostDataModel.deleted = false;

    const databaseResponse = await this.databaseService.add(
      BlogPostModel,
      blogpostDataModel,
    );

    const newBlogPost: GetBlogPostModel = new GetBlogPostModel();
    newBlogPost.id = databaseResponse._id;
    newBlogPost.title = databaseResponse.title;
    newBlogPost.content = databaseResponse.content;

    return newBlogPost;
  }

  async getBlogPostById(blogPostId: string): Promise<GetBlogPostModel> {
    const databaseResponse = await this.databaseService.getOneByID(
      BlogPostModel,
      blogPostId,
    ) as BlogPostModel;

    const blogPost: GetBlogPostModel = new GetBlogPostModel();
    blogPost.id = databaseResponse._id;
    blogPost.title = databaseResponse.title;
    blogPost.content = databaseResponse.content;

    return blogPost;
  }
}
