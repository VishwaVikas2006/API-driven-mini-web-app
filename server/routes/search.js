const express = require('express');
const axios = require('axios');
const Result = require('../models/Result');
const router = express.Router();

// POST /api/search
router.post('/', async (req, res) => {
  const { keyword } = req.body;
  console.log('Received search request:', keyword);
  if (!keyword) return res.status(400).json({ error: 'Keyword required' });
  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json'
        }
      }
    );
    const items = response.data.items.map(repo => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count
    }));
    const result = new Result({ keyword, items });
    await result.save();
    res.json(result);
  } catch (err) {
    console.error('GitHub API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'API error', details: err.response?.data || err.message });
  }
});

module.exports = router;
