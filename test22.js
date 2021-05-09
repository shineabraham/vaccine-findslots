var nodemailer = require('nodemailer');
require('dotenv').config()
const EMAIL1 = process.env.EMAIL
const APP_PWD = process.env.APP_PWD
console.log(EMAIL1);
console.log(APP_PWD);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL1,
    pass: APP_PWD
  }
});

var mailOptions = {
  from: EMAIL1,
  to: EMAIL1,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});