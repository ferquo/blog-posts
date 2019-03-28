import { Injectable } from '@nestjs/common';
import { Operation, applyPatch } from 'fast-json-patch';
import { DatabaseService } from '../shared/database-service';
import { BlogPostModel } from '../models/database/blog-post-model';
import { CreateBlogPostModel } from '../models/viewmodel/create-blog-post-model';
import { GetBlogPostModel } from '../models/viewmodel/get-blog-post-model';
import { RecordNotFoundException } from '../shared/exceptions/record-not-found.exception';
import { validate, ValidationError, ValidateNested } from 'class-validator';
import { ValidationErrorException } from '../shared/exceptions/validation-error.exception';

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
    const blogPostDB = new BlogPostModel();
    blogPostDB.title = blogPost.title;
    blogPostDB.content = blogPost.content;
    blogPostDB.createdOnDate = blogPostDB.updatedOnDate = new Date();
    blogPostDB.deleted = false;

    await this.validateModel(blogPostDB);

    const databaseResponse = await this.databaseService.add(
      BlogPostModel,
      blogPostDB,
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
    currentBlogPost.updatedOnDate = new Date();

    await this.validateModel(currentBlogPost);

    const updateResponse = (await this.databaseService.saveRecord(
      BlogPostModel,
      currentBlogPost,
    )) as BlogPostModel;

    const blogPost: GetBlogPostModel = new GetBlogPostModel();
    blogPost.id = updateResponse._id;
    blogPost.title = updateResponse.title;
    blogPost.content = updateResponse.content;

    return blogPost;
  }

  private async validateModel(blogPost: BlogPostModel) {
    const errors = await validate(blogPost);
    if (errors && errors.length > 0) {
      const errorMessage = this.getMessageFromValidationErrors(errors);
      throw new ValidationErrorException(errorMessage);
    }
  }

  private getMessageFromValidationErrors(errors: ValidationError[]) {
    let errorMessage = '';
    errors.forEach(error => {
      Object.values(error.constraints).forEach(value => {
        errorMessage += value;
      });
    });

    return errorMessage.trim();
  }
}
