
module.exports = function loadSnippets (list, info, category) {
  var fs = require('fs');
  var parseSnippet = require('./parse-snippet');
  var i = 0;
  
  function reportSnippets(error, data) {
    parseSnippet(error, data, info, category);
  }
  
  info.snippets = info.contentPath + '/snippets/';
  info.categories[category] = {
    currentIndex: 0
  };
  
  if (typeof info.specific === 'number') {
    info.categories[category].totalFiles = 1;
    
    fs.readFile(info.snippets + list[info.specific - 1] + '.json', 'utf8', reportSnippets);
    
  } else {
    info.categories[category].totalFiles = list.length;
    
    for (i; i < info.categories[category].totalFiles; i++) {
      fs.readFile(info.snippets + list[i] + '.json', 'utf8', reportSnippets);
    }
    
  }
};