      //Dependencias
  const express = require('express'),
        favicon = require('serve-favicon'),
        path = require('path'),
        //variables de directorio
        faviconDir = path.join(__dirname, '..', 'public', 'images', 'favicon.png'),
        viewDir = path.join(__dirname, 'views'),
        staticDir = express.static(path.join(__dirname, '..','public')),
        //configuración de express
        port = process.env.PORT || 3000,
        app = express(),
        {error404} = require('./controllers/errorControllers'),
        //Enrutador
        router = require('./routes/index');
  
  app
      //Configuracion app
      .set('views', viewDir)
      .set('view engine', 'ejs')
      .set('port', port)
      //Uso de middleware
      .use(favicon(faviconDir))
      .use(express.json())
      .use(express.urlencoded({extended: false}))
      .use(staticDir)
      //Conectando rutas
      .use(router)
      .use(error404);
  
  module.exports = app;