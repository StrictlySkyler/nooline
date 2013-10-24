
module.exports = function updateIndex (category, info) {
  var fs = require('fs');
  var newIndex;

  function commitVersion (error) {
    // TODO: Add versioning here.  
    // Cross-reference against when snippet is saved.
    var update = 'Index updated:  \n'
      +'  Category: ' + category + '\n'
      +'  Snippet: ' + info.specific;
    if (error) {
      console.error(error);
    } else {
      console.log(update);
    }
  }

  info.indexList[category].push(info.specific);

  newIndex = JSON.stringify(info.indexList, null, '\t');

  fs.writeFile(info.index, newIndex, commitVersion);
};