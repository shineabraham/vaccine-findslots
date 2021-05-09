let nodemailer = require('nodemailer');
require('dotenv').config()
var handlebars = require('handlebars');
var fs = require('fs');

//reading variables from .env
const EMAIL1 = process.env.EMAIL
const APP_PWD = process.env.APP_PWD
const NAME = process.env.NAME
console.log(EMAIL1);
console.log(APP_PWD);

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL1,
    pass: APP_PWD
  }
});


exports.sendEmail = function (email, subject, slotDetails, callback) {
	console.log('############################');
	// console.log(typeof(slotDetails))
	const data = JSON.parse(slotDetails);
	console.log(typeof(data))
	// console.log(data[0].center_id)
	readHTMLFile(__dirname + '/emailtemplate.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         name: NAME,
         center_id:data[0].center_id,
         center_name:data[0].name,
         center_address:data[0].address,
         slots:data[0].slots,
         min_age_limit:data[0].min_age_limit
    };
    var htmlToSend = template(replacements);
	var mailOptions = {
	  from: String('Vaccine slot finder ' + EMAIL1),
	  to: email,
	  subject: subject,
	  // text: 'Vaccination slots available. Details: \n\n' + slotDetails
	  html: htmlToSend
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
});
}



