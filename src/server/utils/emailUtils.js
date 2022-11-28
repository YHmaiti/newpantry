const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

const verifyEmail = async (email) => {
  try {
    const validationRes = await mailgunClient.validate.get(email);
    if (validationRes.result === "deliverable") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const sendRecoveryEmail = async (email, recoverToken) => {
  const message = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Pantry - Password Recovery Request",
    text: "Please reset your password by clicking the following link: " + (process.env.NODE_ENV === "production" ? process.env.PROD_DOMAIN : process.env.DEV_DOMAIN) + "/resetPassword/" + recoverToken
  };

  transporter.sendMail(message);
};

const sendConfirmationEmail = async (email, confirmToken) => {
  const message = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Pantry - Please Confirm Your Email Address",
    text: "Please confirm your email by clicking the following link: " + (process.env.NODE_ENV === "production" ? process.env.PROD_DOMAIN : process.env.DEV_DOMAIN) + "/confirmEmail/" + confirmToken
  }

  transporter.sendMail(message);
};

module.exports = { verifyEmail, sendConfirmationEmail, sendRecoveryEmail };