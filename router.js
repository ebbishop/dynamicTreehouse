var Profile = require("./profile.js");

// Handle HTTP route GET / and POST / (Home)
function home(request, response){
	// if (url = '/' && GET)
		// show search
	if(request.url === '/'){
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.write('Header\n');
		response.write('Search\n');
		response.end('Footer\n');
	}
	// if (url = '/' && POST)
		// redirect to /:username
}
// Handle HTTP route GET /:username (emmabbishop)
function user(request, response){
	
	// if (url == '/...')
	var username = request.url.replace('/','');
	if(username.length>0){	
		response.write('Header\n');

		// get json from Treehouse (from profile.js module)
		var studentProfile = new Profile(username);
		// on 'end'
		// WHERE does the profileJSON variable come from?
		studentProfile.on("end", function(profileJSON){
			// show profiles
			// store values which we need
			var values = {
				avatarURL: profileJSON.gravatar_url, // where does profileJSON come from?
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}
			// simple response
			response.write(values.username + ' has ' + values.badges + ' badges.\n');
			response.end('Footer\n');

		});

		// on 'error'
		studentProfile.on('error', function(error){
			// show error
			response.write(error.message + '\n');
			response.end('Footer\n');
		})
	}
}

module.exports.home = home;
module.exports.user = user;