
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import {
  createConnection,
  ConnectionOptions,
  Connection,
  FindManyOptions,
  ObjectLiteral,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  /**
   * Create instance of the Database Service
   */
  constructor(private options: ConnectionOptions) {}

  public async connect() {
    try {
      this.connection = await createConnection(this.options);
      console.log('Connected to database');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async add(collection: any, record: any): Promise<any> {
    this.assertConnection();

    return await this.connection.getMongoRepository(collection).save(record);
  }

  async getAll(collection: any, query: any = {}, ord?: object, page?: any) {
    this.assertConnection();

    const condition: any = {};

    if (query) {
      Object.keys(query).forEach(key => {
        if (typeof query[key] !== 'object') {
          condition[key] = new RegExp([query[key]].join(''), 'i');
        } else {
          condition[key] = query[key];
        }
      });
    }

    condition.deleted = null;

    const options: any = {
      where: condition,
      order: [],
    };

    ord = ord ? ord : { $natural: 'ASC' };
    options.order = ord;

    if (page) {
      options.take = page.take;
      options.skip = page.skip;
    }

    return this.connection.getMongoRepository(collection).find(options);
  }

  async getOneByID(collection: any, id: ObjectId | string): Promise<{}> {
    this.assertConnection();

    if (typeof id === 'string') {
      id = ObjectId(id);
    }

    return this.connection
      .getMongoRepository(collection)
      .findOne({ _id: id, deleted: false });
  }

  async getOneByIDs(collection: any, ids: ObjectId[]) {
    this.assertConnection();
    const options = {
      where: {
        deleted: null,
      },
      order: {
        updated_date: 'DESC',
      },
    } as FindManyOptions<any>;

    return this.connection
      .getMongoRepository(collection)
      .findByIds(ids, options);
  }

  async getOne(collection: any, condition: any) {
    this.assertConnection();
    condition.deleted = null;

    const options = {
      where: condition,
      order: {
        updated_date: 'DESC',
      },
    } as FindManyOptions<any>;

    return this.connection.getMongoRepository(collection).findOne(options);
  }

  async removeById(collection: any, objectId: any) {
    this.assertConnection();

    if (typeof objectId === 'string') {
      objectId = ObjectId(objectId);
    }

    return this.connection.getMongoRepository(collection).delete(objectId);
  }

  async find(collection: any, condition: any, ord?: object, page?: any) {
    this.assertConnection();
    condition.deleted = false;

    const options: any = {
      where: condition,
      order: [],
    };
    ord = ord ? ord : { updatedOnDate: 'DESC' };
    options.order = ord;

    if (page) {
      options.take = page.take;
      options.skip = page.skip;
    }

    return this.connection.getMongoRepository(collection).find(options);
  }

  async getTotal(collection: any): Promise<number> {
    this.assertConnection();

    return this.connection
      .getMongoRepository(collection)
      .count({ deleted: false });
  }

  async updateById(collection: any, id: ObjectId, record: any): Promise<any> {
    this.assertConnection();

    if (typeof id === 'string') {
      id = ObjectId(id);
    }

    if (record && typeof record.id === 'string') {
      record.id = ObjectId(record.id);
    }

    return await this.connection
      .getMongoRepository(collection)
      .update(id, record);
  }

  async saveRecord(collection: any, record: any): Promise<any> {
    this.assertConnection();

    return await this.connection.getMongoRepository(collection).save(record);
  }

  private assertConnection() {
    if (!this.connection) {
      throw new HttpException(
        'Not connected to database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
