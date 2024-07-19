const AppError = require("./../utils/appError");

const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
  });
};

module.exports = globalErrorHandler;
