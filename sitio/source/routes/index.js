const express = require('express'),
      router = express.Router(),
      // Controllers
      {home} = require('../controllers/indexController');

router
      .get('/', home)


module.exports = router;