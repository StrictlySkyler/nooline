/*
 * Gitty - output-parser.js
 * Author: Gordon Hall
 * 
 * Exposes parsing functions for different console output
 */

var parsers = {};

////
// git log
////
parsers['log'] = function(output) {
	var log = '['
	  , commits;
	log += output.substring(0, output.length - 1);
	log += ']';
	commits = JSON.parse(log);
	return commits;
};

////
// git status
////
parsers['status'] = function(gitstatus, untracked) {
	// create status object
	var status = {
		staged : [],
		not_staged : [],
		untracked : untracked.split('\n').slice(0, untracked.split('\n').length - 1)
	},
	// use this var to switch between arrays to push to
	file_status = null,
	// split output into array by line
	output = gitstatus.split('\n');
	// iterate over lines
	output.forEach(function(line) {
		// switch to staged array
		if (line.toLowerCase().indexOf('changes to be committed') > -1) {
			file_status = 'staged';
		// or switch to not_staged array
		} else if (line.toLowerCase().indexOf('changes not staged for commit') > -1) {
			file_status = 'not_staged';
		// or switch to untracked array
		} else if (line.toLowerCase().indexOf('untracked files') > -1) {
			file_status = 'untracked';
		}
		// check if the line contains a keyword
		if (line.indexOf('modified') > -1 ||
		    line.indexOf('new file') > -1 ||
		    line.indexOf('deleted') > -1) {
			// then remove # and all whitespace and split at the colon
			var fileinfo = line.substr(1).trim().split(':');
			// push a new object into the current array
			status[file_status].push({
				file : fileinfo[1].trim(),
				status : fileinfo[0]
			});
		}
	});
	return status;
};

////
// git commit
////
parsers['commit'] = function(output) {
	var commitFailed = (output.indexOf('nothing to commit') > -1 || output.indexOf('no changes added to commit') > -1)
	// if there is nothing to commit...
	if (commitFailed) {
		function reason(output) {
			var lines = output.split('\n')
			  , message;
			for (var ln = 0; ln < lines.length; ln++) {
				if (lines[ln].indexOf('#') === -1) {
					return lines[ln];
				}
			};
		};
		return {
			error : reason(output)
		};
	} else {
		var splitOutput = output.split('\n')
		  , branchAndHash = splitOutput[0].match(/\[([^\]]+)]/g)[0]
		  , branch = branchAndHash.substring(1, branchAndHash.length - 1).split(' ')[0]
		  , hash = branchAndHash.substring(1, branchAndHash.length - 1).split(' ')[1]
		  , filesChanged = splitOutput[1].split(' ')[0]
		  , operations = splitOutput.splice(2);
		return {
			branch : branch,
			commit : hash,
			changed : filesChanged,
			operations : operations
		};
	}
};

////
// git branch
////
parsers['branch'] = function(output) {
	var tree = {
		current : null,
		others : []
	},
	branches = output.split('\n');
	branches.forEach(function(val, key) {
		if (val.indexOf('*') > -1) {
			tree['current'] = val.replace('*', '').trim();
		} else {
			if (val) {
				tree['others'].push(val.trim());
			}
		}
	});
	return tree;
};

////
// git remote -v
////
parsers['remotes'] = function(output) {
	var list = {}
      , parseme = output.split('\n');
	parseme.forEach(function(val, key) {
		if (val.split('\t')[0])
		list[val.split('\t')[0]] = val.split('\t')[1].split(' ')[0];
	});
	return list;
};

////
// git push/pull error
////
parsers['syncErr'] = function(output) {
	var result = output.split('\r\n');
	for (var i = 0; i < result.length; i++) {
		if (!result[i].length) {
			result.splice(i, 1);
		}
	}
	return result;
};

////
// git push/pull success
////
parsers['syncSuccess'] = function(output) {
	var result = output;
	return result;
};

module.exports = parsers;
