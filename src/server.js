const app = require("./app");
const config = require("./config");
// const { connectRedis } = require('./config/redis');

const startServer = async () => {
  try {
    // await connectRedis();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("[app] Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
