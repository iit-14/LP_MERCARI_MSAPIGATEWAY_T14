const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  xray: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
 findings: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("report", ReportSchema);
