var request = require('request');
const axios = require('axios');
const moment = require('moment');



const PIN = 571605
let today = moment();
const DATE = today.format('DD-MM-YYYY')
const AGE = 45


var options = {
  'method': 'GET',
  'url': 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + PIN + '&date=' + DATE,
  'headers': {
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  // console.log(response.body);

  let obj = response.body;
  const data = JSON.parse(obj);
  for(var a in data){
  	sessions =data[a]
  	let validSlots = sessions.filter(slot => slot.min_age_limit <= AGE &&  slot.available_capacity > 0)
  	console.log(validSlots)
    console.log({date:DATE, validSlots: validSlots.length})
    if(validSlots.length > 0) {
      console.log('send notifications to people')
      // notifyMe(validSlots);
    }
  }
  


});
