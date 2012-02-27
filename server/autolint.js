module.exports = {
  paths: [ "./**/*.js" ],   // a list of paths to the files you want linted
  linter: "jslint",         // optionally: jshint
  linterOptions: {          // see default-configuration.js for a list of all options
		node:	true,
		white: true,
		plusplus: true,
		maxerr: 50,
		indent: 2,
		nomen: true,
    predef: []              // a list of known global variables
  },
  excludes: ['autolint.js']              // a list of strings/regexes matching filenames that should not be linted
};
