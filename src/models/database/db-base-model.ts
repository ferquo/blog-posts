import { ObjectIdColumn, Column } from 'typeorm';
import {
    IsOptional, IsDate,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class DbBaseModel {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id?: ObjectId;

    @Column()
    @IsDate()
    createdOnDate: Date;

    @Column()
    @IsDate()
    updatedOnDate: Date;

    @Column()
    @IsOptional()
    deleted?: boolean;

    @Column()
    @IsOptional()
    @IsDate()
    deletedOnDate?: Date;
}
