var router = require('./router.js');

// Problem: simple way to look at user's badge count & js points from browser


//  Solution: use node.js to look up profile(s) and serve via http
// 1. Create web server
var http = require('http');
http.createServer(function(request, response){
	// does this mean that both home and user are called 
	// repeatedly, continuously?
	router.home(request, response);
	router.user(request, response);
}).listen(3000, '127.0.0.1');

console.log('Server running at http:3000 127.0.0.1');

// 4. Function that handles reading of files and merge values into html
	// read from file and get string
		// merge values into html?string