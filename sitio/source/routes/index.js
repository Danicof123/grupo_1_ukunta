const express = require('express'),
      router = express.Router(),
      // Controllers
      {home,about, welcome, index,search} = require('../controllers/indexController');

router
      .get('/', index)
      .get('/home', home)
      .get('/nosotros', about)
      .get('/welcome', welcome)
      .get('/search', search);

module.exports = router;