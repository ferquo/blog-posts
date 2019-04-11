import { Injectable } from '@nestjs/common';
import { Operation, applyPatch } from 'fast-json-patch';
import { DatabaseService } from '../shared/database-service';
import { BlogPostModel } from '../models/database/blog-post-model';
import { CreateBlogPostModel } from '../models/viewmodel/create-blog-post-model';
import { GetBlogPostModel } from '../models/viewmodel/get-blog-post-model';
import { RecordNotFoundException } from '../shared/exceptions/record-not-found.exception';
import { validate, ValidationError, ValidateNested } from 'class-validator';
import { ValidationErrorException } from '../shared/exceptions/validation-error.exception';
import { GetBlogPostsListModel } from '../models/viewmodel/get-blog-posts-list-model';
import { ResourceLinkModel } from '../models/viewmodel/resource-link-model';

@Injectable()
export class BlogPostService {
  constructor(private databaseService: DatabaseService) {}

  async getBlogPosts(query: any, headers: any): Promise<GetBlogPostsListModel> {
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

    const response = new GetBlogPostsListModel();

    const total = await this.databaseService.getTotal(BlogPostModel);
    response.total = total;

    dbResponse.forEach(element => {
      const item = new GetBlogPostModel({
        id: element._id,
        title: element.title,
        content: element.content,
        links: [],
      });
      item.links.push(new ResourceLinkModel({ rel: 'self', href: `http://${headers.host}/blog-posts/${element._id}` }));

      response.blogPosts.push(item);
    });

    // Add resource links
    // First Page
    response.links.push(new ResourceLinkModel({ rel: 'first', href: `http://${headers.host}/blog-posts` }));
    // Self
    response.links.push(new ResourceLinkModel({ rel: 'self', href: `http://${headers.host}/blog-posts?page=${page}` }));
    // Last Page
    const lastPage = Math.ceil(total / 5);
    response.links.push(new ResourceLinkModel({ rel: 'last', href: `http://${headers.host}/blog-posts?page=${lastPage}` }));
    // Previous Page
    if (+page > 1) {
      response.links.push(new ResourceLinkModel({ rel: 'previous', href: `http://${headers.host}/blog-posts?page=${+page - 1}` }));
    }
    // Next Page
    if (+page < lastPage) {
      response.links.push(new ResourceLinkModel({ rel: 'next', href: `http://${headers.host}/blog-posts?page=${+page + 1}` }));
    }

    return response;
  }

  async createBlogPost(
    blogPost: CreateBlogPostModel,
  ): Promise<GetBlogPostModel> {
    const creationDate = new Date();
    const blogPostDB = new BlogPostModel({
      title: blogPost.title,
      content: blogPost.content,
      createdOnDate: creationDate,
      updatedOnDate: creationDate,
      deleted: false,
    });

    await this.validateModel(blogPostDB);

    const databaseResponse = await this.databaseService.add(
      BlogPostModel,
      blogPostDB,
    );

    const newBlogPost: GetBlogPostModel = new GetBlogPostModel({
      id: databaseResponse._id,
      title: databaseResponse.title,
      content: databaseResponse.content,
    });

    return newBlogPost;
  }

  async getBlogPostById(blogPostId: string, headers: any): Promise<GetBlogPostModel> {
    const databaseResponse: BlogPostModel = (await this.databaseService.getOneByID(
      BlogPostModel,
      blogPostId,
    )) as BlogPostModel;

    if (!databaseResponse) {
      throw new RecordNotFoundException();
    }

    const blogPost: GetBlogPostModel = new GetBlogPostModel({
      id: databaseResponse._id,
      title: databaseResponse.title,
      content: databaseResponse.content,
      links: [],
    });
    blogPost.links.push(new ResourceLinkModel({ rel: 'self', href: `http://${headers.host}/blog-posts/${databaseResponse._id}` }));
    blogPost.links.push(new ResourceLinkModel({ rel: 'list', href: `http://${headers.host}/blog-posts/` }));

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

    const blogPost: GetBlogPostModel = new GetBlogPostModel({
      id: updateResponse._id,
      title: updateResponse.title,
      content: updateResponse.content,
    });

    return blogPost;
  }

  async deleteBlogPostById(blogPostId: string) {
    const currentBlogPost: BlogPostModel = (await this.databaseService.getOneByID(
      BlogPostModel,
      blogPostId,
    )) as BlogPostModel;

    if (!currentBlogPost) {
      throw new RecordNotFoundException();
    }

    currentBlogPost.deleted = true;
    currentBlogPost.deletedOnDate = currentBlogPost.updatedOnDate = new Date();

    await this.databaseService.saveRecord(
      BlogPostModel,
      currentBlogPost,
    );
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
