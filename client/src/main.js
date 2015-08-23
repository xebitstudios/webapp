// this is the main JS file, it boots up everything else
var App = require('./app'); // using Browserify, require our main app object

var myapp = new App(); // with the created App object, create a new instance

myapp.start(); // start the app
