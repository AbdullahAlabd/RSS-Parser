const mongoose = require("mongoose");
const logger = require("../utils/logger");

async function connect(url) {
  try {
    await mongoose.connect(url).then((data) => {
      logger.log("info",
        `Database server is connected on host ${data.connection.host}`
      );
    });
  } catch (error) {
    logger.log("error", error);
  }
}

module.exports = connect;
