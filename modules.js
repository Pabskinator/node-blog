// Default format

// const xyz = require('./people');
//
// console.log(xyz.people, xyz.ages);

// Destructuring

const { people, ages } = require('./people');

console.log(people, ages);

// core modules

// os is an object that contains info about the operating system
const os = require('os');

console.log(os.platform(), os.homedir());

