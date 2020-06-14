import { Request, Response, NextFunction } from 'express';
import { AmnError } from './AmnError';

export const amnErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('======== AMN: Error Handler Middleware =============');
    // print stacktrace
    console.log(err.stack);
    if (err instanceof AmnError) {
        console.log(err.getStatus());
        console.log(err.getCode());
        console.log(err.getMessage());

        return res.status(err.getStatus()).send({
            code: err.getCode(),
            message: err.getMessage(),
            explain: err.getExplanation(),
        });
        // logger.debug('Error:Sent');
    }
    // default error handler
    console.log('NodeJs Regular Error');
    res.status(500).send({ code: err.name, message: err.message });
};

export const errorHandler = (
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
