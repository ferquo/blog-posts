export class ResourceLinkModel {
    rel: string;
    href: string;
    public constructor(init?: Partial<ResourceLinkModel>) {
        Object.assign(this, init);
    }
}