import { HttpStatus, HttpException } from '@nestjs/common';
export class ValidationErrorException extends HttpException {
    constructor(message = '') {
        super(`Validation error: ${message}`, HttpStatus.BAD_REQUEST);
    }
}