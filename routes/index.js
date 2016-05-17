const express = require('express');
const router = express.Router();
const isWorking = require('../lib/isWorking');

/* GET home page. */
router.get('/', function(req, res) {
  const answer = isWorking() ? 'Ja' : 'Nej';
  res.render('index', { title: 'Jobbar Janne?', answer });
});

module.exports = router;
