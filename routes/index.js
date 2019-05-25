const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200);
  res.end('Welcome to Youtopia!');
});

module.exports = router;
