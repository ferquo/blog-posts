import { GetBlogPostModel } from '../../../models/viewmodel/get-blog-post-model';
import { CreateBlogPostModel } from '../../../models/viewmodel/create-blog-post-model';
import { Operation } from 'fast-json-patch';

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
        return new GetBlogPostModel();
    }

    async updateBlogPostByIdPatch(
        blogPostId: string,
        operations: Operation[],
    ): Promise<GetBlogPostModel> {
        return new GetBlogPostModel();
    }
}