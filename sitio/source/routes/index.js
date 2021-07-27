const express = require('express'),
      router = express.Router(),
      // Controllers
      {home,about, welcome, index} = require('../controllers/indexController');

router
      .get('/', index)
      .get('/home', home)
      .get('/nosotros', about)
      .get('/welcome', welcome);

module.exports = router;