const jobPostingRepository = require("../repositories/job-posting-repository");

const getAll = async (title = null) => {
  const jobPostings = await jobPostingRepository.getAll();
  if (jobPostings?.length === 0) {
    return [];
  }
  const presentableJobPostings = jobPostings
    .filter((posting) => (title ? posting.title.equals(title) : true))
    .map((posting) => getPresentablePosting(posting));
  return presentableJobPostings;
};

const getPresentablePosting = async (jobPosting) => {
  // TODO: implement the transformations needed to present the job posting
  return jobPosting;
};

module.exports = { getAll };
