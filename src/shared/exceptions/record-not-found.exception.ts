import { HttpStatus, HttpException } from '@nestjs/common';
export class RecordNotFoundException extends HttpException {
  constructor() {
    super('Record not found', HttpStatus.NOT_FOUND);
  }
}
