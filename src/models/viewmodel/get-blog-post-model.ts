import { ResourceLinkModel } from './resource-link-model';

export class GetBlogPostModel {
    id: string;
    title: string;
    content: string;

    links: ResourceLinkModel[];

    public constructor(init?: Partial<GetBlogPostModel>) {
        Object.assign(this, init);
    }
}
