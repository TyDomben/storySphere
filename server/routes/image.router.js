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
router.post('/', async (req, res) => {
  const { url, caption, storyId } = req.body; 
  const queryText = `
    INSERT INTO images (url, caption, storyid)
    VALUES ($1, $2, $3)
    RETURNING *;`; // Returning the inserted row can be helpful for the client
  try {
    const dbRes = await pool.query(queryText, [url, caption, storyId]);
    res.json(dbRes.rows[0]);
  } catch (err) {
    console.error('Error completing INSERT image query', err);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { caption } = req.body; // ? update the caption
  const queryText = `
    UPDATE images
    SET caption = $1
    WHERE id = $2
    RETURNING *;`;
  try {
    const dbRes = await pool.query(queryText, [caption, id]);
    if (dbRes.rows.length > 0) {
      res.json(dbRes.rows[0]);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    console.error('Error completing UPDATE image query', err);
    res.sendStatus(500);
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const queryText = `
    DELETE FROM images
    WHERE id = $1
    RETURNING *;`; // Returning the deleted row can be helpful for confirmation
  try {
    const dbRes = await pool.query(queryText, [id]);
    if (dbRes.rows.length > 0) {
      res.json(dbRes.rows[0]);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    console.error('Error completing DELETE image query', err);
    res.sendStatus(500);
  }
});


module.exports = router;
