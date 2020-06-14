import { AmnError } from './AmnError';
// export { AmnError };

declare interface IErrorCode {
    status: number;
    code: string;
    message: string;
}

export { amnErrorHandler, errorHandler } from './mw';

export const error = (
    status: number,
    code: string,
    message: string,
    explanation?: string
) => new AmnError(status, code, message, explanation);

export const errorCode = (errCode: IErrorCode, explanation?: string) =>
    new AmnError(errCode.status, errCode.code, errCode.message, explanation);
