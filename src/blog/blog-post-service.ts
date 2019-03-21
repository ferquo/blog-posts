import { Injectable } from '@nestjs/common';
import { Operation, applyPatch } from 'fast-json-patch';
import { DatabaseService } from '../shared/database-service';
import { BlogPostModel } from '../models/database/blog-post-model';
import { CreateBlogPostModel } from '../models/viewmodel/create-blog-post-model';
import { GetBlogPostModel } from '../models/viewmodel/get-blog-post-model';
import { RecordNotFoundException } from '../shared/exceptions/record-not-found.exception';

@Injectable()
export class BlogPostService {
  constructor(private databaseService: DatabaseService) {}

  async getBlogPosts(query: any): Promise<GetBlogPostModel[]> {
    const page = query.page || 1;
    const pageOptions = {
      take: 5,
      skip: (page - 1) * 5,
    };
    const dbResponse = (await this.databaseService.find(
      BlogPostModel,
      {},
      {},
      pageOptions,
    )) as BlogPostModel[];

    const response: GetBlogPostModel[] = [];
    dbResponse.forEach(element => {
      const item = new GetBlogPostModel();
      item.id = element._id;
      item.title = element.title;
      item.content = element.content;

      response.push(item);
    });

    return response;
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
    const databaseResponse: BlogPostModel = (await this.databaseService.getOneByID(
      BlogPostModel,
      blogPostId,
    )) as BlogPostModel;

    if (!databaseResponse) {
      throw new RecordNotFoundException();
    }

    const blogPost: GetBlogPostModel = new GetBlogPostModel();
    blogPost.id = databaseResponse._id;
    blogPost.title = databaseResponse.title;
    blogPost.content = databaseResponse.content;

    return blogPost;
  }

  async updateBlogPostByIdPatch(
    blogPostId: string,
    operations: Operation[],
  ): Promise<GetBlogPostModel> {
    const currentBlogPost: BlogPostModel = (await this.databaseService.getOneByID(
      BlogPostModel,
      blogPostId,
    )) as BlogPostModel;

    if (!currentBlogPost) {
      throw new RecordNotFoundException();
    }

    applyPatch(currentBlogPost, operations);

    const blogPost: GetBlogPostModel = new GetBlogPostModel();
    return blogPost;
  }
}
