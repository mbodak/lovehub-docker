import { IErrorMessages } from '../config/IErrorMessages';
import { errorMessages } from '../config/errorMessages';

export class MessageCodeError extends Error {
  public messageCode: string;
  public httpStatus: number;
  public errorMessage: string;

  constructor(messageCode: string) {
    super();

    const errorMessage = this.getMessageFromMessageCode(messageCode);
    if (!errorMessage) {
      throw new Error('Unable to find message code error.');
    }

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpStatus = errorMessage.status;
    this.messageCode = messageCode;
    this.errorMessage = errorMessage.errorMessage;
    this.message = errorMessage.userMessage;
  }

  private getMessageFromMessageCode(messageCode: string): IErrorMessages {
    let errorMessage: IErrorMessages | undefined;
    Object.keys(errorMessages).some(key => {
      if (key === messageCode) {
        errorMessage = errorMessages[key];
        return true;
      }
      return false;
    });

    if (!errorMessage) {
      throw new Error('Unable to find the given message code error.');
    }

    return errorMessage;
  }
}
