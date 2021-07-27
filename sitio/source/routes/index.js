const express = require('express'),
      router = express.Router(),
      // Controllers
      {home,about} = require('../controllers/indexController');

router
      .get('/', home)
      .get('/nosotros', about)


module.exports = router;