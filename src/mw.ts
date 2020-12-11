import { Request, Response, NextFunction } from 'express';
import { AmnError } from './AmnError';

// const isFunction = (foo?: Function) => {
//     if (typeof foo === 'function') return true;
//     return false;
// };

export const errorHandler = () => (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const enableLogging = isFunction(logger);
    // enableLogging &&
    //     logger!('======== AMN: Error Handler Middleware =============');
    // enableLogging && logger!(err.stack);\
    console.log('======== AMN: Error Handler Middleware =============');
    console.log(err.stack);
    if (err instanceof AmnError) {
        return res.status(err.getStatus()).send({
            code: err.getCode(),
            message: err.getMessage(),
            explain: err.getExplanation(),
        });
    }
    // default error handler
    // enableLogging && logger!('NodeJs Regular Error');
    console.log('NodeJs Regular Error');
    res.status(500).send({ code: err.name, message: err.message });
};

// export const errorHandler = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     // console.log('======== AMN: Error Handler Middleware =============');
//     // print stacktrace
//     // console.log(err.stack);
//     if (err instanceof AmnError) {
//         return res.status(err.getStatus()).send({
//             code: err.getCode(),
//             message: err.getMessage(),
//             explain: err.getExplanation(),
//         });
//     }
//     // default error handler
//     // console.log('NodeJs Regular Error');
//     res.status(500).send({ code: err.name, message: err.message });
// };

export const defaultErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).send({
        code: err.name || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'critical server-side internal error',
    });
};
