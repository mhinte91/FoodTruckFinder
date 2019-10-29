// The application should be run here by entering 'node index.js' into the CLI

const foodTruckFinder = require('./foodTruckFinder');
console.log('NAME'.padEnd(70) + 'ADDRESS');
foodTruckFinder.getFoodTrucks();
