import { DbBaseModel } from './db-base-model';
import { Entity, Column } from 'typeorm';
import { Length, IsDefined } from 'class-validator';

@Entity('blogPost')
export class BlogPostModel extends DbBaseModel {
  @Column()
  @Length(5, 20)
  @IsDefined()
  title: string;

  @Column()
  @Length(10, 200)
  @IsDefined()
  content: string;
}
