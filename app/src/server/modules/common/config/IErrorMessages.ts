import { HttpStatus } from '@nestjs/common';

export interface IErrorMessages {
  type: string;
  status: HttpStatus;
  errorMessage: string;
  userMessage: string;
}
