/*
 * Gitty - grapher.js
 * Author: Gordon Hall
 * 
 * Parses textual network graph into 2D array of UI data
 */

function init(data) {
	// split first dimension of data by newline
	var graph = []
	  , data = data.split('\n');
	// iterate over each newline and create a new
	data.forEach(function(val, key) {
		if (val) {
			graph.push(parseLine(val));
		}
	});
};

// parses an individual line into ui consumable objects
function parseLine(line) {
	var parsed = [];
	for (var chr = 0; chr < line.length; chr++) {
		var component = {};
		// create an object for each ui component that should be generated
		switch(line[chr]) {
			case '|':
				component.type = 'forward';
				component.data = null;
				break;
			case '\\':
				component.type = 'merge_upstream';
				component.data = null;
				break;
			case '/':
				component.type = 'merge_downstream';
				component.data = null;
				break;
			case '_':
				component.type = 'merge_through';
				component.data = null;
				break;
			case '*':
				component.type = 'commit';
				component.data = null;
				break;
			case '\s':
				component.type = 'blank';
				component.data = null;
				break;
			default:
			var splitMsg = line.slice(chr).split(' ');
				component.type = 'message';
				component.data = {
					hash : splitMsg[0],
					message : splitMsg.splice(1).join(' ')
				};
				parsed.push(component);
				return parsed;
		}
		parsed.push(component);
	}
	return parsed;
};

module.exports = init;