const express = require('express');

const router = express.Router();

/* GET photos listing. */
router.get('/', (req, res) => {
  res.json([]);
});

module.exports = router;
