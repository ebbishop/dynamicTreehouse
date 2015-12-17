var fs = require('fs');

function mergeValues(values, content){
	// Cycle over keys
	// replace {{key}}s in html with value from values object
	for(var key in values){
		content = content.replace('{{' + key + '}}', values[key])
	}
	// return merged content
	return content;
}

function view (templateName, values, response) {
	// read from template files
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', 'utf-8');

	// insert values into template
	fileContents = mergeValues(values,fileContents);
	// write out to response
	response.write(fileContents);

}

module.exports.view = view;