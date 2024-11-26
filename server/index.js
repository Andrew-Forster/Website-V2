const express = require('express')
const vhost = require('vhost');
require('dotenv').config();
const emailRoutes = require('./routes/email');
const minesweeperRoutes = require('./routes/minesweeper');
const { rateLimitMiddleware, rateLimitTime } = require('./middlewares/ratelimit');
const path = require('path');
const app = express()
const triumphtech = express();
const port = process.env.port || 3000;


// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Page Links
const pages = ['/', '/home', '/about', '/portfolio', '/skills'];

pages.forEach(page => {
  app.get(page, (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
});

// Connect Redirect

app.get('/connect', (req, res) => {
  res.redirect('https://www.linkedin.com/in/andrewjforster/');
});

// Github Redirect
app.get(['/github', '/gh', '/git'], (req, res) => {
  res.redirect('https://github.com/Andrew-Forster');
});

app.use('/triumphtech', express.static(path.join(__dirname, '/public/triumphtech')));

app.get('/triumphtech', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/triumphtech/index.html'));
});

// Subdomain

triumphtech.use(vhost('triumphtech.andrewjf.com', express.static(path.join(__dirname, '/public/triumphtech'))));

triumphtech.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, '/public/triumphtech/index.html'));
});



// Routes
app.use('/api/email', rateLimitMiddleware, emailRoutes);
app.use('/api/minesweeper', rateLimitTime(5), minesweeperRoutes);



// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/public/HTML/Pages/404.html'));
});

app.listen(port, () => {
  console.log(`Project is listening at http://localhost:${port}`)
})    