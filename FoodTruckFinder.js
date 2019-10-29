var request = require('request');
var getCurrentDateTime = require('./currentDateTime');
var currentTime = getCurrentDateTime.currentTime();
var currentDay = getCurrentDateTime.currentDay();
const APP_TOKEN = 'y7DiqX5Imd6S7we4cbAoc76uj';
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(
  `http://data.sfgov.org/resource/bbb8-hzi6.json?$$app_token=${APP_TOKEN}&$order=applicant&dayorder=${currentDay}&$where=start24<='${currentTime}'%20and%20end24>'${currentTime}'`,
  function(error, response, body) {
    if (error !== null) {
      console.log(`The following error has occured: ${error}`);
      process.exit();
    } else {
      parsedFoodTrucks = JSON.parse(body);
      let startIndex = 0;
      let endIndex = 10;
      truckOutput(parsedFoodTrucks, startIndex, endIndex);
    }
  }
);

truckOutput = (parsedFoodTrucks, startIndex, endIndex) => {
  count = parsedFoodTrucks.length;
  for (i = startIndex; i < endIndex && i < count; i++) {
    console.log(
      `${parsedFoodTrucks[i].applicant} ${parsedFoodTrucks[i].location}`
    );
  }
  if (endIndex < count) {
    rl.question('Would you like to view more Food Trucks? (y/n):  ', input => {
      if (input.toLowerCase() === 'y') {
        startIndex += 10;
        endIndex += 10;
        truckOutput(parsedFoodTrucks, startIndex, endIndex);
      } else if (input.toLowerCase() === 'n') {
        console.log('Goodbye');
        rl.close();
        process.exit();
      } else {
        truckOutput(parsedFoodTrucks, startIndex, endIndex);
      }
    });
  } else {
    console.log('There are no more food trucks currently in service. Goodbye!');
    process.exit();
  }
};

// to run locally, first install node and npm. then:
// $ npm install request && node FoodTruckFinder.js
