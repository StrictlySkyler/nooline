/**
 * This file merely loads the require-directory module, which then loads each
 * of the files in this directory.
 *
 * https://github.com/troygoode/node-require-directory/
 */
var requireDirectory = require('require-directory');
module.exports = requireDirectory(module);
