const express = require('express');

const { getLatest, add, remove } = require('../controller/best');

const router = express.Router();

/* GET photos listing. */
router.get('/', async (req, res) => {
  const best = await getLatest();
  res.json(best);
});

/* POST photos entry */
router.post('/', async (req, res) => {
  const { photos } = req.body;
  const best = await add(photos);
  res.json(best);
});

/* DELETE entries */
router.delete('/', async (req, res) => {
  const result = await remove();
  res.json(result);
});

module.exports = router;
