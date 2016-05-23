const express = require('express');
const router = express.Router();
// const isWorking = require('../assets/js/isWorking');

/* GET home page. */
router.get('/', function(req, res) {
  // const answer = isWorking() ? 'Ja' : 'Nej';
  res.render('index', { title: 'Jobbar Janne?' });
});

module.exports = router;
