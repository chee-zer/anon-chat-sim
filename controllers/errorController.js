const AppError = require("./../utils/appError");

const globalErrorHandler = (err, res, req, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.status).json({
    status: err.status,
    error: err,
    stack: err.stack,
  });
};
