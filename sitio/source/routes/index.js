const express = require('express'),
      router = express.Router(),
      // Controllers
      {home,about, welcome} = require('../controllers/indexController');

router
      .get('/', home)
      .get('/nosotros', about)
      .get('/welcome', welcome);

module.exports = router;