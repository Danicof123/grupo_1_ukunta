const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.listen(port, () => console.log(`Servidor iniciado en puerto ${port}`));

app.use(express.static('public'));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/404', (req,res) => res.sendFile(path.join(__dirname, 'views', '404.html')));
app.get('/about', (req,res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/cart', (req,res) => res.sendFile(path.join(__dirname, 'views', 'cart.html')));
app.get('/login', (req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/products', (req,res) => res.sendFile(path.join(__dirname, 'views', 'products.html')));
app.get('/register', (req,res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/store', (req,res) => res.sendFile(path.join(__dirname, 'views', 'store.html')));
app.get('/welcome', (req,res) => res.sendFile(path.join(__dirname, 'views', 'welcome.html')));