



const express = require('express');
const Result = require('../models/Result');
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  try {
    const results = await Result.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await Result.countDocuments();
    res.json({ results, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    console.error('Error:', err.message, err.response?.data);
    res.status(500).json({ error: 'API error', details: err.response?.data || err.message });
  }
});

module.exports = router;
