
module.exports = function loadSnippets (list, info, category) {
  var fs = require('fs');
  var parseSnippet = require('./parse-snippet');
  var updateIndex = require('./update-index');
  var _  = require('underscore');
  var i = 0;
  var target = list[info.specific - 1];
  
  function reportSnippets(error, data) {
      parseSnippet(error, data, info, category);
  }
  
  info.snippets = info.contentPath + '/snippets/';
  info.categories[category] = {
    currentIndex: 0
  };

  // If the snippet requested is above the bounds of the array, we must be 
  // requesting the guid of the snippet.  Usually this is for POSTs, 
  // which have this information, but it's available for some content requests
  // also, in certain circumstances.
  if (!target) {
    target = _.find(list, function findIndex (index) {
      return index === info.specific;
    });
  }
  // If there was no match in the index, it must be new content, so it'll be
  // our target (to make).
  if (!target && info.req.method === 'POST') {
    info.setup.models[0].get('snippets').add(info.req.body);
    updateIndex(category, info);

    return;
  }
  
  if (typeof info.specific === 'number') {
    info.categories[category].totalFiles = 1;
    
    fs.readFile(info.snippets + target + '.json', 'utf8', reportSnippets);
    
  } else {
    info.categories[category].totalFiles = list.length;
    
    for (i; i < info.categories[category].totalFiles; i++) {
      fs.readFile(info.snippets + list[i] + '.json', 'utf8', reportSnippets);
    }
    
  }
};