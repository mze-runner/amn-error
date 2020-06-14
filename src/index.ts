import { AmnError } from './AmnError';

declare interface IErrorCode {
    status: number;
    code: string;
    message: string;
}

export { amnErrorHandler, errorHandler } from './mw';

/**
 * Error function
 * @param status - HTTP status code, e.g. 4XX, 5XX, etc
 * @param code - error code, usually in capital ERROR_REASON
 * @param message - free text to explain a reason
 * @param explanation - optional extra filed to provide more derails around a nature of an error
 */
export const error = (
    status: number,
    code: string,
    message: string,
    explanation?: string
) => new AmnError(status, code, message, explanation);

/**
 *
 * @param errCode - is an interface, provides status
 * @param explanation
 */
export const errorCode = (errCode: IErrorCode, explanation?: string) =>
    new AmnError(errCode.status, errCode.code, errCode.message, explanation);
