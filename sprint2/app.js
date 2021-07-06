const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.listen(port, () => console.log(`Servidor iniciado en puerto http://127.0.0.1:${port}`));

app.use(express.static('public'));

app.get('/', (req,res) => res.redirect('/home'));
app.get('/home', (req,res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));

app.get('/404', (req,res) => res.sendFile(path.join(__dirname, 'views', '404.html')));
// app.get('/grid', (req,res) => res.sendFile(path.join(__dirname, 'views', 'test', 'grid-test.html'))); //Eliminar esta linea - solo para testeo
app.get('/nosotros', (req,res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/cart', (req,res) => res.sendFile(path.join(__dirname, 'views', 'cart.html')));
app.get('/login', (req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/products', (req,res) => res.sendFile(path.join(__dirname, 'views', 'products.html')));
app.get('/register', (req,res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/store', (req,res) => res.sendFile(path.join(__dirname, 'views', 'store.html')));
app.get('/bienvenido', (req,res) => res.sendFile(path.join(__dirname, 'views', 'welcome.html')));