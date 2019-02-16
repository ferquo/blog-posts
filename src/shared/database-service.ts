import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  async get() {
    return { message: 'Hello World!' };
  }
}
