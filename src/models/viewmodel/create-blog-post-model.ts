export class CreateBlogPostModel {
    public title: string;
    public content: string;
    public constructor(init?: Partial<CreateBlogPostModel>) {
        Object.assign(this, init);
    }
}
