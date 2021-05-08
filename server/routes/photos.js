const express = require('express');

const { getLatest } = require('../controller/best');

const router = express.Router();

/* GET photos listing. */
router.get('/', async (req, res) => {
  const best = await getLatest();
  res.json(best);
});

module.exports = router;
