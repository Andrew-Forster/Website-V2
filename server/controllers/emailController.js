const emailService = require('../services/emailService');

// Controller logic for sending emails
exports.sendEmail = (req, res) => {
  // Extract email data from request body
  const email = req.body.email;
  const message = req.body.message;

  // Send email using email service
  emailService.sendEmail(email, message)
    .then(() => {
      res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    });

  emailService.sendConfirmationEmail(email, message)
    .then(() => {
      console.log('Confirmation email sent');
    })
    .catch((error) => {
      console.error('Error sending confirmation email:', error);
    });
  
};