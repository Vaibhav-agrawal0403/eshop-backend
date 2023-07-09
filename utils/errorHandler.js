class ErrorHandler extends Error{
    constructor (message,statusCode){
        super(message);
        this.statusCode = statusCode;

        // captureStackTrace returns a string that represents the location of that particular error in the call
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler