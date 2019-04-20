import { Operation, applyPatch } from 'fast-json-patch';
import { NotFoundException } from '@nestjs/common';
import { CreateBlogPostModel } from '../../models/viewmodel/create-blog-post-model';
import { GetBlogPostModel } from '../../models/viewmodel/get-blog-post-model';
import { BlogPostModel } from '../../models/database/blog-post-model';
import { validate } from 'class-validator';
import { ValidationErrorException } from '../../shared/exceptions/validation-error.exception';
import { RecordNotFoundException } from '../../shared/exceptions/record-not-found.exception';

export class BlogPostService {
    async getBlogPosts(query: any): Promise<GetBlogPostModel[]> {
        return [];
    }

    async createBlogPost(
        blogPost: CreateBlogPostModel,
    ): Promise<GetBlogPostModel> {

        const blogPostValidation = new BlogPostModel();
        blogPostValidation._id = 'new_id';
        blogPostValidation.title = blogPost.title;
        blogPostValidation.content = blogPost.content;
        blogPostValidation.createdOnDate = blogPostValidation.updatedOnDate = new Date();

        const errors = await validate(blogPostValidation);

        if (errors && errors.length > 0) {
            throw new ValidationErrorException();
        }

        const newBlogPost = new GetBlogPostModel();
        newBlogPost.id = 'new_id';
        newBlogPost.title = blogPost.title;
        newBlogPost.content = blogPost.content;

        return newBlogPost;
    }

    async getBlogPostById(blogPostId: string): Promise<GetBlogPostModel> {
        if (blogPostId === 'existing-blog-post') {
          const result = new GetBlogPostModel({
            id: 'existing-blog-post',
            title: 'Expected Title',
            content: 'Expected content',
          });

          return Promise.resolve(result);
        } else {
          throw new NotFoundException();
        }
    }

    async updateBlogPostByIdPatch(
        blogPostId: string,
        operations: Operation[],
    ): Promise<GetBlogPostModel> {
        if (blogPostId === 'existing-blog-post') {
            const result = new GetBlogPostModel({
                id: 'existing-blog-post',
                title: 'Expected Title',
                content: 'Expected content',
            });

            applyPatch(result, operations);

            return Promise.resolve(result);
        } else {
          throw new NotFoundException();
        }
    }

    async deleteBlogPostById(blogPostId: string) {
        if (blogPostId === 'existing-blog-post') {
            Promise.resolve({});
        } else {
            throw new RecordNotFoundException();
        }
    }
}
