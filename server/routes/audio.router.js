const express = require('express');
const router = express.Router();
// const audioController = require('./audioController'); // TBD

// GET request to fetch an audio file
router.get('/audio/:id', audioController.getAudio);

// POST request to upload/create a new audio file
router.post('/audio', audioController.uploadAudio);

// PUT request to update an existing audio file
router.put('/audio/:id', audioController.updateAudio);

// DELETE request to delete an audio file
router.delete('/audio/:id', audioController.deleteAudio);

module.exports = router;
