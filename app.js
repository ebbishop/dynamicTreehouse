var router = require('./router.js');

var http = require('http');
http.createServer(function(request, response){
	console.log(request.url);

	// does this mean that both home and user are called 
	// repeatedly, continuously?
	router.home(request, response);
	router.user(request, response);
}).listen(3000, '127.0.0.1');

console.log('Server running at http:3000 127.0.0.1');

