// Logging module, which prints out easy-to-read timestamped and filestamped
// logs. Use 1>>[debugfile] and 2>>[errorfile] to track the logging.
//
// Format is:
// hour:minutes:seconds.milliseconds month/date/year filename: content

'use strict';

var path = require('path'),
	time,
	date,
	now;

exports.debug = function(file, data) {
	
	var time = new Date().getHours() +
		':' +
		new Date().getMinutes() +
		':' +
		new Date().getSeconds() +
		'.' +
		new Date().getMilliseconds() +
		'ms',
	date =  (new Date().getMonth() + 1) +
		'/' +
		new Date().getDate() +
		'/' +
		new Date().getFullYear(),
	now = time + ' ' + date;
	
	console.log('\u001b[1;30m' +
		now,
		path.basename(file) +
		':' +
		'\u001b[0m',
		'\n',
		data);
	
};

exports.error = function(file, data) {
	
	var time = new Date().getHours() +
		':' +
		new Date().getMinutes() +
		':' +
		new Date().getSeconds() +
		'.' +
		new Date().getMilliseconds() +
		'ms',
	date =  (new Date().getMonth() + 1) +
		'/' +
		new Date().getDate() +
		'/' +
		new Date().getFullYear(),
	now = time + ' ' + date;
	
	console.error('\u001b[1;31m' +
		now,
		path.basename(file) +
		':' +
		'\u001b[1;33m',
		'\n',
		data +
		'\u001b[0m');
	
};