
module.exports = function loadSnippets (list, req, res, info) {
  var fs = require('fs');
  var parseSnippet = require('./parse-snippet');
  var i = 0;
  
  function reportSnippets(error, data) { 
    parseSnippet(error, data, req, res, info);
  }
  
  info.snippets = info.contentPath + '/snippets/';
  info.currentIndex = 0;
  
  if (!info.setup.snippets) {
    info.setup.snippets = [];
  }
  
  if (info.specific) {
    info.totalFiles = 1;
    
    fs.readFile(info.snippets + list[info.specific - 1] + '.json', 'utf8', reportSnippets);
    
  } else {
    info.totalFiles = list.length;
    
    for (i, list; i < info.totalFiles; i++) {
      fs.readFile(info.snippets + list[i] + '.json', 'utf8', reportSnippets);
    }
    
  }
};