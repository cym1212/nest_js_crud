// exceptions/business.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './error-codes.enum';

export class BusinessException extends HttpException {
  constructor(errorCode: ErrorCodes, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ message: errorCode }, statusCode);
  }
}
