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
    from: process.env.email_route,
    to: process.env.email,
    subject: 'Website Contact Form',
    html: `
    <html>
    <head>
      <style>
        /* Define CSS styles */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: rgb(0, 53, 84);
          color: #fff;
          padding: 20px;
          text-align: center;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .content {
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ccc;
        }
        .message {
          background-color: rgb(15, 18, 20);
          color: #fff;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .footer {
          background-color: rgb(0, 53, 84);
          color: #fff;
          padding: 10px;
          text-align: center;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank you for your message!</h1>
        </div>
        <div class="content">
        <div class="message">${message}</div>
        <p>Sent From ${email}</p>
        </div>
        <div class="footer">
          <p>Copyright &copy; 2024 https://andrewjf.com All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
  };

  return transporter.sendMail(mailOptions);
};

// Send confirmation email to user

exports.sendConfirmationEmail = (email, message) => {
  const mailOptions = {
    from: process.env.email_route,
    to: email,
    subject: 'Message Received!',
    html: `
    <html>
    <head>
      <style>
        /* Define CSS styles */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: rgb(0, 53, 84);
          color: #fff;
          padding: 20px;
          text-align: center;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .content {
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ccc;
        }
        .message {
          background-color: rgb(15, 18, 20);
          color: #fff;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .footer {
          background-color: rgb(0, 53, 84);
          color: #fff;
          padding: 10px;
          text-align: center;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank you for your message!</h1>
        </div>
        <div class="content">
          <h4>Hi there,</h4>
          <p>I received your message and will get back to you as soon as possible.</p>
          <p>\nThanks in advance, Andrew</p>
          <h3>\nHere's a copy of your message:</h3>
          <div class="message">${message}</div>
        </div>
        <div class="footer">
          <p>Copyright &copy; 2024 https://andrewjf.com All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
  };

  return transporter.sendMail(mailOptions);
}