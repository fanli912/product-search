const express = require('express');
const router = express.Router();


router.post("/search", (req, res) => {

  const post = req.body;

  res.status(201).json({
    message: 'Post added successfully'
  });
});

module.exports = router;
