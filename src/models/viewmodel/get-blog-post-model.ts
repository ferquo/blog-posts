export class GetBlogPostModel {
    id: string;
    title: string;
    content: string;

    public constructor(init?: Partial<GetBlogPostModel>) {
        Object.assign(this, init);
    }
}
