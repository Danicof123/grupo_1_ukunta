//Dependencias
  const express = require('express'),
        session = require('express-session'),
        cookies = require('cookie-parser'),
        favicon = require('serve-favicon'),
        path = require('path'),
        methodOverride =  require('method-override'), // Pasar poder usar los métodos PUT y DELETE  
        //variables de directorio
        faviconDir = path.join(__dirname, '..', 'public', 'images', 'favicon.png'),
        viewDir = path.join(__dirname, 'views'),
        staticDir = express.static(path.join(__dirname, '..','public')),
        //configuración de express
        port = process.env.PORT || 3000,
        app = express(),
        //Controladores
        {error404} = require('./controllers/errorController'),
        //Middlewares
        userLoggedMiddleware = require('./middlewares/userLoggedMiddleware'),
        localsUserCheck = require('./middlewares/localsUserCheck'),
        //Enrutador
        router = require('./routes/index'),
        adminRouter = require('./routes/admin'),
        usersRouter = require('./routes/users'),
        productsRouter = require('./routes/products'),
        cartRouter = require('./routes/cart');

  app
      //Configuracion app
      .set('views', viewDir)
      .set('view engine', 'ejs')
      .set('port', port)
      //Uso de middleware
      .use(session({
          secret: 'Ukunta',
          resave: false,
          saveUninitialized: false,
      }))
      .use(cookies())
      .use(userLoggedMiddleware)
      .use(localsUserCheck)
      //
      .use(favicon(faviconDir))
      .use(express.json())
      .use(express.urlencoded({extended: false}))
      .use(methodOverride('_method'))
      .use(staticDir)
      //Conectando rutas
      .use(router)
      .use('/admin',adminRouter)
      .use('/users', usersRouter)
      .use('/store', productsRouter)
      .use('/cart', cartRouter)
      .use(error404);
      
  
  module.exports = app;
