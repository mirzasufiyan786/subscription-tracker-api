const errorMiddleware = (err, req, res, next) => {
try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    // Mongoose: Invalid ObjectId
    if (err.name === "CastError") {
        error.message = `Resource not found. Invalid: ${err.path}`;
        error.statusCode = 400;
    }

    // Mongoose: Duplicate Key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        error.message = `Duplicate value entered for ${field}`;
        error.statusCode = 400;
    }

    // Mongoose: Validation Error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(val => val.message);
        error.message = `Validation error: ${messages.join(", ")}`;
        error.statusCode = 400;
    }

    // // JWT: Invalid Token
    // if (err.name === "JsonWebTokenError") {
    //     error.message = "JSON Web Token is invalid, try again";
    //     error.statusCode = 401;
    // }

    // // JWT: Expired Token
    // if (err.name === "TokenExpiredError") {
    //     error.message = "JSON Web Token has expired, please log in again";
    //     error.statusCode = 401;
    // }

    // Fallback for other errors
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    res.status(error.statusCode).json({
        success: false,
        message: error.message
    });

} catch (error) {
    next(error);
}
};

module.exports = errorMiddleware;
