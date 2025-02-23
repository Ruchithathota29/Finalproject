// backend/models/JobApplication.js
const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, required: true },
  applicationDate: { type: Date, required: true },
  followUpDate: { type: Date },
  notes: { type: String },
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);
module.exports = JobApplication;
