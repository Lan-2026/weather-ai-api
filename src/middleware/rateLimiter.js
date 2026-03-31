// const { redisClient } = require("../config/redisClient");
// const config = require("../config");

// const WINDOW_SECONDS = config.rateLimit.windowSeconds;
// const MAX_REQUESTS = config.rateLimit.maxRequests;

// const rateLimiter = async (req, res, next) => {
//   try {
//     const ip = req.ip;
//     const key = `rate_limit:${ip}`;

//     const currentCount = await redisClient.incr(key);

//     if (currentCount === 1) {
//       await redisClient.expire(key, WINDOW_SECONDS);
//     }

//     if (currentCount > MAX_REQUESTS) {
//       const ttl = await redisClient.ttl(key);

//       return res.status(429).json({
//         error: "Too many requests. Please try again later.",
//         retryAfterSeconds: ttl,
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("[rateLimiter] Redis error:", error.message);
//     next();
//   }
// };

const rateLimiter = (req, res, next) => next();

module.exports = rateLimiter;
