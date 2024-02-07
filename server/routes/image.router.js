const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
    try {
      const queryText = 'SELECT * FROM images'; // sample query
      const dbRes = await pool.query(queryText);
      res.json(dbRes.rows);
    } catch (err) {
      console.error('Error completing SELECT images query', err);
      res.sendStatus(500);
    }
  });
  

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
