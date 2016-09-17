var bodyParser = require('body-parser');
// json requirement
var jsonParser = bodyParser.json();
// framework
var express = require('express');


var app = express();

// object
var curPos = {1: {'white': 0, 'black': 0}, 2: {'white': 0, 'black': 2}, 3: {'white': 0, 'black': 0}, 4: {'white': 0, 'black': 0}, 5: {'white': 0, 'black': 0}, 6: {'white': 0, 'black': 0}, 7: {'white': 5, 'black': 0}, 8: {'white': 0, 'black': 0}, 9: {'white': 0, 'black': 0}, 10: {'white': 3, 'black': 0}, 11: {'white': 0, 'black': 0}, 12: {'white': 0, 'black': 0}, 13: {'white': 0, 'black': 0}, 14: {'white': 0, 'black': 5}, 15: {'white': 5, 'black': 0}, 16: {'white': 0, 'black': 0}, 17: {'white': 0, 'black': 0}, 18: {'white': 0, 'black': 0}, 19: {'white': 0, 'black': 3}, 20: {'white': 0, 'black': 0}, 21: {'white': 0, 'black': 0}, 22: {'white': 0, 'black': 5}, 23: {'white': 0, 'black': 0}, 24: {'white': 0, 'black': 0}, 25: {'white': 0, 'black': 0}, 26: {'white': 0, 'black': 0}, 27: {'white': 2, 'black': 0}, 28: {'white': 0, 'black': 0}}

// endpoint with variable path 
app.get('/roll/:num_dice', 
// function
function(request, response) {
	// declare Array variable
  	var randArr = [];
  	// for loop
    for (var i = 0; i < request.numDice; i++) {
    	// random number generation
    	var randNum = Math.random() * (7 - 1) + 1;
    	// if, else statements with Array.length method
      	if (randArr.list === 1 && randNum === randArr[0]) {
      		randArr.push(randNum);
      		randArr.push(randNum);
      		randArr.push(randNum);
      	} else {
      		randArr.push(randNum);
      	}
    // return response.json
    return response.json(randArr);
  });
});
// server set-up
var runServer = function(callback) {
    var port = process.env.PORT || 8080;
    var server = app.listen(port, function() {
        console.log('Listening on port ' + port);
        if (callback) {
            callback(server);
        }
    });
};
// run server
if (require.main === module) {
  runServer();
}

// exports
exports.app = app;
exports.runServer = runServer;
