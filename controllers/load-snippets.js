
module.exports = function loadSnippets (list, req, res, info) {
  var fs = require('fs');
  var parseSnippet = require('./parse-snippet');
  var i = 0;
  info.snippets = info.domain + '/snippets/';
  
  info.currentIndex = 0;
  info.totalFiles = list.length;
  
  function reportSnippets(error, data) {
    
    parseSnippet(error, data, req, res, info);
  }
  
  for (i, list; i < info.totalFiles; i++) {
    fs.readFile(info.snippets + list[i] + '.json', 'utf8', reportSnippets);
  }
};