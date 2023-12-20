const nodemailer = require('nodemailer');
require('dotenv').config();

const host = process.env.HOST;
const port = process.env.PORT;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});
const sendMail = async (email, token) => {
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: `${email}`,
    subject: 'Email Verification',
    text: `Click on this Link to verify your email:${host}:${port}/api/v1/customer/verify?token=${token}&email=${email}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    } else {
      return info.response;
    }
  });
};
const sendPasswordResetMail = async (email) => {
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: `${email}`,
    subject: 'Password Reset',
    text: `Click on this Link to reset your password:${host}:${port}/api/v1/vendor/password_reset`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    } else {
      return info.response;
    }
  });
};
const sendconfirmationCodeMail = async (email, confirmationCode) => {
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: `${email}`,
    subject: 'Delivery Confirmation Code',
    text: `Your Delivery confirmation code is ${confirmationCode}, please share this code with the delivery driver. Do not share this cod with any other person`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    } else {
      return info.response;
    }
  });
};

module.exports = { sendMail, sendconfirmationCodeMail, sendPasswordResetMail };
