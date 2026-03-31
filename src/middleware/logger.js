const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP request", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
    });
  });

  next();
};

module.exports = requestLogger;
