const express = require("express");
const homeController = require("../controllers/home-controller");

const route = express.Router();

// get all job postings
route.get("/", homeController.getAll);

module.exports = route;
