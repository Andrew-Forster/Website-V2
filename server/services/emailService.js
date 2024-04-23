const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.email,
        pass: process.env.pass,
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
        refreshToken: process.env.refresh_token,
    },
    debug: true // Enable debug logging
});

// Send email to self
exports.sendEmail = (email, message) => {
  const mailOptions = {
    from: process.env.email,
    to: process.env.email, 
    subject: 'Website Contact Form',
    text: `${message} \n\n Sent from: ${email}`
  };

  return transporter.sendMail(mailOptions);
};

// Send confirmation email to user

exports.sendConfirmationEmail = (email, message) => {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: 'We got your message!',
    text: `Hi there! \n\n I received your message and will get back to you as soon as possible. 
    \n\n Thanks in advance, Andrew.\n\n Here's a copy of your message: \n\n ${message} `
  };

  return transporter.sendMail(mailOptions);
}