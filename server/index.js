const express = require('express')
require('dotenv').config();
const emailRoutes = require('./routes/email');
const path = require('path');
const app = express()
const port = process.env.port || 3000;

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

app.get('/v1', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.sendFile(path.join(__dirname, '/v1/index.html'));
});

// Serve static files for v1
app.use('/v1', express.static(path.join(__dirname, '/v1/public')));

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/api/email', emailRoutes);


app.listen(port, () => {
  console.log(`Project is listening at http://localhost:${port}`)
})    