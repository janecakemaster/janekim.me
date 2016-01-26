const express = require('express');
const router = express.Router();

const baseTitle = 'jane kim';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: `${baseTitle}` });
});

router.get('/resume', (req, res, next) => {
  res.render('resume', { title: `${baseTitle} - resume` });
});

module.exports = router;
