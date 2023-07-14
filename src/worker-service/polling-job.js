const jobPostingRepository = require("../repositories/job-posting-repository");
const logger = require("../utils/logger");
const axios = require("axios");
const convert = require("xml-js");
const pollingJob = async (job) => {
  try {
    const url = job.attrs.data.url;

    let response = null;
    let error = null;
    try {
      response = await axios.get(url);
      const rssData = convert.xml2js(response.data, {
        compact: true,
        spaces: 4
      });
      const jobPostingsRaw = rssData.rss.channel.item;
      let jobPostingList = [];
      jobPostingsRaw.forEach((element) => {
        jobPostingList.push({
          title: element.title?._text,
          link: element.link?._text?.trim(),
          guid: element.guid?._text,
          description: element.description?._text,
          category: element.category?._text,
          division: element.division?._text,
          country: element.country?._text,
          city: element.city?._text,
          postedDate: element.posted_date?._text
        });
      });
      const jobPostings = await jobPostingRepository.createMany(jobPostingList);
      logger.log(
        "info",
        `Successfully added: ${jobPostings.length} job postings out of: ${jobPostings.length}!`
      );
    } catch (err) {
      logger.log(
        "info",
        `Successfully added: ${err?.insertedDocs?.length} job postings out of: ${err?.results?.length} while ${err.writeErrors.length} failed with error: ${err?.errmsg}!`
      );
    }
  } catch (error) {
    logger.log("error", error);
  }
};

module.exports = pollingJob;
