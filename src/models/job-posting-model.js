const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPostingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  guid: {
    type: String,
    required: true,
    unique: true // job link must be unique
  },
  description: {
    // html string
    type: String,
    required: true
  },
  category: {
    type: String
  },
  division: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  postedDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    //expires: is the TTL(time to live) for the document in seconds
    expires: 30 * 24 * 60 * 60 // 30 Days
  }
});
jobPostingSchema.index({ guid: 1 });
module.exports = mongoose.model("JobPosting", jobPostingSchema);
