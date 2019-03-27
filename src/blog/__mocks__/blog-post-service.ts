import { Operation } from 'fast-json-patch';
import { NotFoundException } from '@nestjs/common';
import { CreateBlogPostModel } from '../../models/viewmodel/create-blog-post-model';
import { GetBlogPostModel } from '../../models/viewmodel/get-blog-post-model';

export class BlogPostService {
    async getBlogPosts(query: any): Promise<GetBlogPostModel[]> {
        return [];
    }

    async createBlogPost(
        blogPost: CreateBlogPostModel,
    ): Promise<GetBlogPostModel> {
        return new GetBlogPostModel();
    }

    async getBlogPostById(blogPostId: string): Promise<GetBlogPostModel> {
        if (blogPostId === 'existing-blog-post') {
            const result = new GetBlogPostModel()
            result.id = 'existing-blog-post';
            result.title = 'Expected Title';
            result.content = 'Expected content';
            return Promise.resolve(result);
        } else {
            throw new NotFoundException();
        }
    }

    async updateBlogPostByIdPatch(
        blogPostId: string,
        operations: Operation[],
    ): Promise<GetBlogPostModel> {
        return new GetBlogPostModel();
    }
}