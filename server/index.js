const express = require('express')
require('dotenv').config();
const emailRoutes = require('./routes/email');
const rateLimitMiddleware = require("./middlewares/ratelimit");
const path = require('path');
const app = express()
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
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
});

// Connect Redirect

app.get('/connect', (req, res) => {
  res.redirect('https://www.linkedin.com/in/andrewjforster/');
});


// Routes
app.use('/api/email', rateLimitMiddleware, emailRoutes);


// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/public/HTML/Pages/404.html'));
});

app.listen(port, () => {
  console.log(`Project is listening at http://localhost:${port}`)
})    