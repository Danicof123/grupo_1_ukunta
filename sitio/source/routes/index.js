const express = require('express'),
      router = express.Router(),
      // Controllers
      { home, about, welcome, index, search } = require('../controllers/indexController'),
      //Validaciones
      { indexValidator } = require('../modules/validator')
      

router
      .get('/', index)
      .get('/home', home)
      .post('/home', indexValidator, home)
      .get('/nosotros', about)
      .get('/welcome', welcome)
      .get('/search', search);

module.exports = router;