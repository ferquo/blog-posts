import { DbBaseModel } from './db-base-model';
import { Entity, Column } from 'typeorm';

@Entity('blogPost')
export class BlogPostModel extends DbBaseModel {
    @Column()
    title: string;

    @Column()
    content: string;
}
