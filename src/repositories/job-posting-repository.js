const jobPostingModel = require("../models/job-posting-model");

const create = async (jobPostingDto) => {
  const createdJobPosting = new jobPostingModel(jobPostingDto);
  return await createdJobPosting.save();
};

const createMany = async (jobPostingDtoList) => {
  return await jobPostingModel.insertMany(jobPostingDtoList, {
    ordered: false
  });
};

const findAll = async () => {
  return await jobPostingModel.find().exec();
};

const findById = async (jobPostingId) => {
  return jobPostingModel.findById(jobPostingId);
};

const update = async (jobPostingId, jobPostingDto) => {
  return await jobPostingModel
    .findByIdAndUpdate(jobPostingId, jobPostingDto, { new: true })
    .exec();
};

const remove = async (jobPostingId) => {
  return await jobPostingModel.findByIdAndDelete(jobPostingId).exec();
};

module.exports = {
  create,
  createMany,
  findAll,
  findById,
  update,
  remove
};
