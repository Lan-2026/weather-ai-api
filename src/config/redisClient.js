// const { createClient } = require("redis");
// const config = require("./index");

// const redisClient = createClient({
//   url: config.redisUrl,
// });

// redisClient.on("error", (err) =>
//   console.error("[redis] client error:", err.message),
// );

// redisClient.on("connect", () => console.log("[redis] connected"));

// redisClient.connect().catch((err) => {
//   console.error("[redis] failed to connect:", err.message);
// });

// const connectRedis = async () => {
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//     console.log("[redis] Connected successfully");
//   }
// };

// module.exports = {
//   redisClient,
//   connectRedis,
// };
