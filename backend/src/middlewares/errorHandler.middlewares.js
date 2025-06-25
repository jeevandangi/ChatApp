import { ApiErrorHandler } from '../utils/apiErrorHandler.js';

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiErrorHandler) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            error: err.error,
            data: err.data
        });
    }

    // fallback for unknown errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export { errorHandler };
