var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sahadan@gmail.com',
    pass: 'Lij@Pooso19907'
  }
});

var mailOptions = {
  from: 'sahadan@gmail.com',
  to: 'sahadan.r@faithinfotech.in',
  subject: 'TEST MAIL',
  text: ` Hi! Welcome!`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});