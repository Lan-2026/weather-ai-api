const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Unhandled error", {
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
  });

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
