import { ObjectId } from 'mongodb';

export class DatabaseService {
  async add(collection: any, record: any): Promise<any> {
    return Promise.resolve({
      _id: 'new-blog-post',
      title: record.title,
      content: record.content,
      createdOnDate: record.createdOnDate,
      updatedOnDate: record.updatedOnDate,
      deleted: record.deleted,
    });
  }

  async getOneByID(collection: any, id: ObjectId | string): Promise<{}> {
    if (id === 'existing-blog-post') {
      return Promise.resolve({
        _id: 'existing-blog-post',
        title: 'Expected Title',
        content: 'Expected content',
        createdOnDate: new Date(),
        updatedOnDate: new Date(),
        deleted: false,
      });
    } else {
      return Promise.resolve(undefined);
    }
  }

  async find(collection: any, condition: any, ord?: object, page?: any) {
    const take = page.take || 5;
    const skip = page.skip || 0;

    return Promise.resolve(
      [
        {
          _id: 'blog-post-1',
          title: 'Expected Title 1',
          content: 'Expected content 1',
          createdOnDate: new Date(),
          updatedOnDate: new Date(),
          deleted: false,
        },
        {
          _id: 'blog-post-2',
          title: 'Expected Title 2',
          content: 'Expected content 2',
          createdOnDate: new Date(),
          updatedOnDate: new Date(),
          deleted: false,
        },
        {
          _id: 'blog-post-3',
          title: 'Expected Title 3',
          content: 'Expected content 3',
          createdOnDate: new Date(),
          updatedOnDate: new Date(),
          deleted: false,
        },
        {
          _id: 'blog-post-4',
          title: 'Expected Title 4',
          content: 'Expected content 4',
          createdOnDate: new Date(),
          updatedOnDate: new Date(),
          deleted: false,
        },
        {
          _id: 'blog-post-5',
          title: 'Expected Title 5',
          content: 'Expected content 5',
          createdOnDate: new Date(),
          updatedOnDate: new Date(),
          deleted: false,
        },
        {
          _id: 'blog-post-6',
          title: 'Expected Title 6',
          content: 'Expected content 6',
          createdOnDate: new Date(),
          updatedOnDate: new Date(),
          deleted: false,
        },
        {
          _id: 'blog-post-7',
          title: 'Expected Title 7',
          content: 'Expected content 7',
          createdOnDate: new Date(),
          updatedOnDate: new Date(),
          deleted: false,
        },
      ].slice(skip, (skip + 1) * take),
    );
  }

  async getTotal(collection: any): Promise<number> {
    return Promise.resolve(1);
  }

  async saveRecord(collection: any, record: any): Promise<any> {
    return Promise.resolve({
      _id: 'existing-blog-post',
      title: 'Expected Title',
      content: 'Expected content',
      createdOnDate: new Date(),
      updatedOnDate: new Date(),
      deleted: false,
    });
  }
}
