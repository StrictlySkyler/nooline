var fs = require('fs'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').errog;

exports.publish = function(postData, request, response) {
	
	var file = './client/' +
		request.headers.host +
		'/content/' +
		postData.match(/\w+/)[0] +
		'/' +
		postData +
		'.json',
	content;
	
	fs.readFile(file, 'utf8', function(error, data) {
		if (error) {
			errlog(__filename, error);
		} else {
			content = JSON.parse(data);
			
			content.published = true;
			
			fs.writeFile(file, JSON.stringify(content, null, '\t'),
				function(error, data) {
					if (error) {
						errlog(__filename, error)
					} else {
						debug(__filename, 'Publishing ' + postData + '...');
					}
				});
		}
	});
	
};