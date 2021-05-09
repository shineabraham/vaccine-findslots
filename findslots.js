var request = require('request');
const moment = require('moment');
require('dotenv').config()

//testing with todays date
let today = moment();
const DATE = today.format('DD-MM-YYYY')


//reading variables from .env
const PIN = process.env.PIN
const AGE = process.env.AGE

// function to check availability in the next 10 days from the days returned by function fetchNext10Days
async function checkAvailability() {

    let datesArray = await fetchNext10Days();
    datesArray.forEach(date => {
        getSlotsForDate(date);
    })
}

//function to fetch the next 10 days
async function fetchNext10Days(){
    let dates = [];
    let today = moment();
    for(let i = 0 ; i < 10 ; i ++ ){
        let dateString = today.format('DD-MM-YYYY')
        dates.push(dateString);
        today.add(1, 'day');
    }
    // console.log(dates);
    return dates;
}

//function to return slots available on specific date
function getSlotsForDate(DATE) {
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
	  	// console.log(validSlots)
	    // console.log({date:DATE, validSlots: validSlots.length})
	    if(validSlots.length > 0) {
	      console.log(`send notifications to people with age ${AGE}+ about ${validSlots.length} vaccine centers nearby for the date ${DATE}`);
	      console.log('The vaccine centers open are :');
	      console.log(validSlots);
	      // for(var w in validSlots){
	      // 	console.log('The vaccine centers open are :',validSlots[w].name, 'address : ', validSlots[w].address, 'centre id : ', validSlots[w].center_id)
	      // }
	      console.log('########################')
	      // notifyMe(validSlots);
	    }
	  }
	});
}
// getSlotsForDate(DATE);
checkAvailability()
