// default error
const INTERNAL_SERVER_ERROR = {
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'critical internal error',
};

export class AmnError extends Error {
    #status: number;
    #code: string;
    #explanation: string | undefined;

    constructor(
        status?: number,
        code?: string,
        message?: string,
        explanation?: string
    ) {
        super(message || INTERNAL_SERVER_ERROR.message);
        this.#code = code || INTERNAL_SERVER_ERROR.code;
        this.#status = status || INTERNAL_SERVER_ERROR.status;
        this.#explanation = explanation || undefined;
        Object.setPrototypeOf(this, AmnError.prototype);
        // Capturing stack trace, excluding constructor call from it.
        AmnError.captureStackTrace(this, this.constructor);
    }

    serialize() {
        const explanation = this.#explanation
            ? `, explanation: ${this.#explanation} `
            : '';
        return `Error: http status: ${this.#status}, code: ${
            this.#code
        }, message: ${this.message}${!explanation}`;
    }

    getStatus() {
        return this.#status;
    }

    getCode() {
        return this.#code;
    }

    getMessage() {
        return this.message;
    }

    getExplanation() {
        return this.#explanation;
    }

    getTrace() {
        return this.stack;
    }
}
