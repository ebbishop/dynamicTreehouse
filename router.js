var Profile = require("./profile.js");
var render = require('./render.js')
var querystring = require('querystring');

var commonHeader = { 'Content-Type': 'text/html' };

function home(request, response){

	if(request.url === '/'){
	  if(request.method.toLowerCase() === 'get'){
  		response.writeHead(200, commonHeader);
  		render.view('header', {},response);
  		render.view('search', {}, response);
  		render.view('footer', {}, response);
  		response.end();
	  }else{

		// uses name & name's value of "POST" element)
		request.on('data', function(postBody){
			var query = querystring.parse(postBody.toString());
			response.writeHead(303, {'Location': '/' + query.username});
			response.end();
		});
	  	
	  }
	}
	response.on('error', function(error){
		response.writeHead(200, commonHeader);
		render.view('header', {},response);
		render.view('error', {errorMessage: error.message}, response);
		render.view('search', {}, response);
		render.view('footer', {}, response);
		response.end();
	});
}


function user(request, response){	
	var username = request.url.replace('/','');
	if(username.length>0){
		response.writeHead(200, commonHeader);	
		render.view('header', {},response);

		var studentProfile = new Profile(username);

		// Where does the profileJSON variable name come from?
		studentProfile.on("end", function(profileJSON){
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}

			render.view('profile', values, response);
			render.view('footer', {}, response);
			response.end();

		});

		studentProfile.on('error', function(error){
			render.view('error', {errorMessage: error.message}, response);
			render.view('search', {}, response);
			render.view('footer', {}, response);
			response.end();
		});
	}
}

module.exports.home = home;
module.exports.user = user;