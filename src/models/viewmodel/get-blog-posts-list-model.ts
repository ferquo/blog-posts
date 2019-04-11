import { GetBlogPostModel } from './get-blog-post-model';

export class GetBlogPostsListModel {
    blogPosts: GetBlogPostModel[] = [];
    total: number;
    links: any[] = [];
}