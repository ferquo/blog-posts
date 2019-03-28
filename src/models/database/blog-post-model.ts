import { DbBaseModel } from './db-base-model';
import { Entity, Column } from 'typeorm';
import { Length, IsDefined } from 'class-validator';

@Entity('blogPost')
export class BlogPostModel extends DbBaseModel {
  @Column()
  @Length(5, 30, {
    message: 'Title length must be at least 5 characters, at most 20.',
  })
  @IsDefined({
    message: 'Title not specified.',
  })
  title: string;

  @Column()
  @Length(10, 200, {
    message: 'Content length must be at least 10 characters, at most 200.',
  })
  @IsDefined({
    message: 'Content not specified.',
  })
  content: string;
}
