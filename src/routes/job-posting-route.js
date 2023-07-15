const express = require("express");
const jobPostingController = require("../controllers/job-posting-controller");

const route = express.Router();

// get all job postings
route.get("/", jobPostingController.getAll);

module.exports = route;
