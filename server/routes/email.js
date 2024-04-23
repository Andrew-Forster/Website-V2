const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Route for sending emails
router.post('/send', emailController.sendEmail);

module.exports = router;