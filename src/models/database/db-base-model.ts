import { ObjectIdColumn, Column } from 'typeorm';
import {
    IsDateString, IsOptional,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class DbBaseModel {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id?: ObjectId;

    @Column()
    @IsDateString()
    createdOnDate: Date;

    @Column()
    @IsDateString()
    updatedOnDate: Date;

    @Column()
    @IsOptional()
    deleted?: boolean;

    @Column()
    @IsDateString()
    deletedOnDate?: Date;
}
