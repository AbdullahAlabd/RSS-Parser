const jobPostingService = require("../services/job-posting-service");

const getAll = async (req, res, next) => {
  try {
    const params = req.query;
    console.log(params);
    const { title } = req.query;
    const presentableJobPostings = await jobPostingService.getAll(title);
    return res.status(200).json({
      success: true,
      data: presentableJobPostings,
      message:
        presentableJobPostings.length > 0
          ? "Request successful!"
          : "Request successful! but you have no reports yet."
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAll };
