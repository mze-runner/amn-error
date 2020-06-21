# AMN Error

Amn Error is an extension module on top of [expressjs](#https://expressjs.com/).

Native [`Error`](#https://nodejs.org/api/errors.html) class is limited and does not allow to response with specific http code and supply an error with more details.

AMN Error able to accommodate additional fields in compare to nodejs native error class.

`status` - HTTP status of error. Must be a valid http status code!

`code` - similar to node js error code which delivers internal error code.

`message` - is inherited from nodejs `Error` class.

`explanation` - an optional field to accommodate more detail on error nature you want to provide to a client.

Amn Error gives more flexibility on declaring error back to a client.

For example, 401 - unauthorized may looks like following.

```javascript
import error from 'amn-error';

throw error.create(401, 'UNAUTHORIZED', 'bad credentials');
```

Client get back `http status code` as 401 (unauthorized)

And JSON object

```javascript
{
    "code": "UNAUTHORIZED",
    "message": "bad credentials"
}
```

## How to raise and error

Amn error provides two ways to raise an error by means on bespoke AmnError Class.

```javascript
import error from 'amn-error';

/**
 * Error function
 * @param status - valid HTTP status code, e.g. 4XX, 5XX, etc
 * @param code - error code, usually in capital ERROR_REASON
 * @param message - free text to explain a reason
 * @param explanation - optional extra filed to provide more derails around a nature of an error
 */

throw error.create(
    400,
    'BAD_REQUEST',
    'bad request from client',
    'invalid email'
);

throw error.create(
    404,
    'NOT_FOUND',
    'resource not found',
    'fail to find user account'
);

throw error.create(
    500,
    'INTERNAL_SERVER_ERROR',
    'critical server-side internal error'
);
```

On large scale services, it may be worth to pre-define errors as JSON object and pass it to error functions, rather than provide parameter by parameter.

Amn Error delivers an extra function to support a more declarative approach

```javascript
import error from 'amn-error';

// pre-define error code object
const BAD_REQUEST: { status: 400, code: 'BAD_REQUEST', message: 'bad request from client' };

const UNAUTHORIZED: { status: 401, code: 'UNAUTHORIZED', message: 'user is not authorized' }

const INTERNAL_SERVER_ERROR: { status: 500, code: 'INTERNAL_SERVER_ERROR', message: 'critical server-side internal error' }

// raise and error examples
throw error.withCode(BAD_REQUEST, 'invalid email');

throw error.withCode(UNAUTHORIZED);

throw error.withCode( INTERNAL_SERVER_ERROR);
```

`errorCode` function consume as parameters an object with the following interface

```javascript
declare interface IErrorCode {
    status: number; // valid HTTP status code, e.g. 4XX, 5XX, etc
    code: string; // error code, usually in capital ERROR_REASON
    message: string; // free text to explain a reason
}
```

and as the second parameter - `explanation` - optional extra filed to provide more derails around a nature of

## How use middleware

Amn Error provides two middleware.
`amnErrorHandler` - to handle bespoke amn error class.

`errorHandler` - to handle an error raised by native nodejs `Error`, but reply to a client with a http status code. By default status code is `500`.

> `defaultErrorHandler` provided just for compatibility with native nodejs `Error` class.

```javascript
import error from 'amn-error';

const app = express();

this.app.use(error.errorHandler);
```
