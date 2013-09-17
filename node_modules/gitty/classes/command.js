/*
 * Gitty - command.js
 * Author: Gordon Hall
 * 
 * Handles the execution of Git commands
 */

var exec = require('child_process').exec
  , execSync = require('execSync').stdout
  , Command;
  
Command = function(repo_path, operation, flags, options) {
	this.repo = repo_path;
	// assemble command
	this.command = 'git ' + operation;
	// add flags
	for (var flag = 0; flag < flags.length; flag ++) {
		this.command += ' ' + flags[flag];
	}
	// add options
	this.command +=  ' ' + options;	
};

Command.prototype.exec = function(callback, sync) {
	if (!sync) {
		exec(this.command, { cwd : this.repo }, callback);
	} else {
		try {
			process.chdir(this.repo);
			var stdout = execSync(this.command)
			callback.call(this, null, stdout);
		} catch(e) {
			callback.call(this, e, null);
		}
	}
};

module.exports = Command;