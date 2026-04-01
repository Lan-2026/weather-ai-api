require("dotenv").config();

const express = require("express");
const app = express();

const logger = require("./middleware/logger");
// const rateLimiter = require("./middleware/rateLimiter");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const errorHandler = require("./middleware/errorHandler");
const aiRoutes = require("./routes/aiRoutes");
const ragRoutes = require("./routes/rag.routes");

app.use(express.json());
app.use(logger);
// app.use(rateLimiter);

// mount routes
app.use("/users", userRoutes);
app.use("/weather", weatherRoutes);
app.use("/ai", aiRoutes);
app.use("/rag", ragRoutes);

// test route
app.get("/hello", (req, res) => {
  res.json({ message: "Hello backend world" });
});

app.use(errorHandler);

module.exports = app;
