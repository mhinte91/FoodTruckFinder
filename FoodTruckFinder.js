const APP_TOKEN = 'y7DiqX5Imd6S7we4cbAoc76uj';
var request = require('request');
var readline = require('readline');
var getCurrentDateTime = require('./currentDateTime');
var currentTime = getCurrentDateTime.currentTime();
var currentDay = getCurrentDateTime.currentDay();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var foodTrucks = (module.exports = {
  // Request method fetches open food trucks alphabetically, and sets the start and end indices for future iteration
  getFoodTrucks: function() {
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
          foodTrucks.truckOutput(parsedFoodTrucks, startIndex, endIndex);
        }
      }
    );
  },

  // Output method to control the display of food trucks. If there are more than 10 items,
  // the user is prompted to view more, or quit. The method will then be called recursively after
  // the index values are incremented by 10. This process may be repeated until the end of the list is reached.
  truckOutput: function(parsedFoodTrucks, startIndex, endIndex) {
    count = parsedFoodTrucks.length;
    for (i = startIndex; i < endIndex && i < count; i++) {
      console.log(
        `${parsedFoodTrucks[i].applicant.padEnd(75)}${
          parsedFoodTrucks[i].location
        }`
      );
    }
    if (endIndex < count) {
      rl.question(
        'Would you like to view more Food Trucks? (y/n):  ',
        input => {
          if (input.toLowerCase() === 'y') {
            startIndex += 10;
            endIndex += 10;
            foodTrucks.truckOutput(parsedFoodTrucks, startIndex, endIndex);
          } else if (input.toLowerCase() === 'n') {
            console.log('Goodbye');
            rl.close();
            process.exit();
          } else {
            foodTrucks.truckOutput(parsedFoodTrucks, startIndex, endIndex);
          }
        }
      );
    } else {
      console.log(
        'There are no more food trucks currently in service. Goodbye!'
      );
      process.exit();
    }
  }
});
