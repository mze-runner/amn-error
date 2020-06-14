# AMN Error

Native [`Error`](#https://nodejs.org/api/errors.html) class is limited in the number of fields it has. AMN Error able to accommodate additional fields in compare to nodejs native error class.

`status` - HTTP status of error.

`code` - similar to node js error code which delivers internal error code.

`explanation` - an optional field to accommodate more detail on error nature you want to provide to a client.

`message` - is inherited from nodejs `Error` class.

### How to use

# How
