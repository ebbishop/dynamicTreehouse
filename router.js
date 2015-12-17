var Profile = require("./profile.js");
var render = require('./render.js')
var querystring = require('querystring');

var commonHeader = { 'Content-Type': 'text/html' };

// Handle HTTP route GET / and POST / (Home)
function home(request, response){
	// if (url = '/' && GET)
		// show search
	if(request.url === '/'){
	  if(request.method.toLowerCase() === 'get'){
  		response.writeHead(200, commonHeader);
  		render.view('header', {},response);
  		render.view('search', {}, response);
  		render.view('footer', {}, response);
  		response.end();
	  }else{
		// if (url = '/' && POST)
		// get post data from body (uses name & value of "POST" thing)
		request.on('data', function(postBody){
			var query = querystring.parse(postBody.toString());
			response.writeHead(303, {'Location': '/' + query.username});
			response.end();
		});
		// extract username
		// redirect to /username
	  	
	  }
	}
}
// Handle HTTP route GET /:username (emmabbishop)
function user(request, response){
	
	// if (url == '/...')
	var username = request.url.replace('/','');
	if(username.length>0){
		response.writeHead(200, commonHeader);	
		render.view('header', {},response);

		// get json from Treehouse (from profile.js module)
		var studentProfile = new Profile(username);
		// on 'end'
		// WHERE does the profileJSON variable come from?
		studentProfile.on("end", function(profileJSON){
			// show profiles
			// store values which we need
			var values = {
				avatarUrl: profileJSON.gravatar_url, // where does profileJSON come from?
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}

			// simple response
			render.view('profile', values, response);
			render.view('footer', {}, response);
			response.end();

		});

		// on 'error'
		studentProfile.on('error', function(error){
			// show error
			response.writeHead(200, commonHeader);
			render.view('error', {errorMessage: error.message}, response);
			render.view('search', {}, response);
			render.view('footer', {}, response);
			response.end();
		})
	}
}

module.exports.home = home;
module.exports.user = user;