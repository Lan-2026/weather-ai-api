const serverless = require("serverless-http");
const app = require("./app");
// const { connectRedis } = require("./config/redis");

let isInitialized = false;

const initialize = async () => {
  if (!isInitialized) {
    // await connectRedis();
    isInitialized = true;
  }
};

module.exports.handler = async (event, context) => {
  await initialize();

  const handler = serverless(app);
  return handler(event, context);
};
