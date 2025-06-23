class ApiErrorHandler extends Error {
    constructor(success, statusCode, message, error = [], data = null) {
        super(message);
        this.name = this.constructor.name;
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

export { ApiErrorHandler };
