const Agenda = require("agenda");
const dotenv = require("dotenv");
const logger = require("../utils/logger");
const jobs = require(".");

dotenv.config({ path: "./src/configs/config.env" });

// instantiate Agenda and connect to database.
const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URI,
    collection: "jobs",
    options: { useUnifiedTopology: true }
  },
  processEvery: "10 seconds",
  defaultLockLifetime: 10000,
  maxConcurrency: 20
});

// define all agenda jobs
agenda.define("polling-job", async (job) => {
  await jobs.pollingJob(job);
});

agenda
  .on("ready", async () => {
    logger.info("Agenda started!");
  })
  .on("error", () => {
    logger.info("Agenda connection error!");
  });

(async function () {
  await agenda.start();
  // Schedule All Jobs
  const rssUrl = process.env.RSS_SOURCE;
  const job = agenda.create("polling-job", {
    url: rssUrl
  });
  job.unique({ "data.url": rssUrl });
  await job.repeatEvery(`${process.env.RSS_POLLING_INTERVAL} minutes`).save();
})();

module.exports = agenda;
