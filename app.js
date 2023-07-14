const connectDb = require("./src/database/connect");
const express = require("express");
const dotenv = require("dotenv");
const errorHandlerMiddleware = require("./src/middleware/error-handler");
const agenda = require("./src/worker-service/agenda");
// routes
const homeRoute = require("./src/routes/home-route");

// initialize express
const app = express();
dotenv.config({ path: "./src/configs/config.env" });

// to get request of json data
app.use(express.json({limit: '1kb'})); // limit body size to 1kb
app.use("/", homeRoute);
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
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
}
start();
