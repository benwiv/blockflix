const express = require('express');
const router = express.Router();

//   GET for homepage
router.get('/', (req, res) => {
  res.render('index', {title: 'Blockflix', message: 'hello dave'});
});

module.exports = router;