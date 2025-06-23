

class apiResponseHandler {
    constructor(success = true, statusCode = 200, message = "Success", data) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { apiResponseHandler }