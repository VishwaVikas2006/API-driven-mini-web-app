const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  keyword: String,
  items: [
    {
      name: String,
      html_url: String,
      description: String,
      stargazers_count: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
