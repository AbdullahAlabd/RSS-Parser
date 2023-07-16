const connectDb = require("./src/database/connect");
const express = require("express");
const dotenv = require("dotenv");
const errorHandlerMiddleware = require("./src/middleware/error-handler");
const agenda = require("./src/worker-service/agenda");
const path = require("path");
const logger = require("./src/utils/logger");

// routes
const jobPostingRoute = require("./src/routes/job-posting-route");

// initialize express
const app = express();
dotenv.config({ path: "./src/configs/config.env" });

// to get request of json data
app.use(express.json({limit: '1kb'})); // limit body size to 1kb
app.use(express.static(path.join(__dirname, '/src/public')));
app.use("/api/v1/jobs", jobPostingRoute);
app.use(errorHandlerMiddleware);

// for graceful shutdown
async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);

async function start() {
  await connectDb(process.env.MONGODB_URI);
  app.listen(process.env.PORT, () => {
    logger.log("info", `Server is listening on port ${process.env.PORT}`);
  });
}
start();
