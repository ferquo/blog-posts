import { GetBlogPostModel } from './get-blog-post-model';
import { ResourceLinkModel } from './resource-link-model';

export class GetBlogPostsListModel {
    blogPosts: GetBlogPostModel[] = [];
    total: number;
    links: ResourceLinkModel[] = [];
}