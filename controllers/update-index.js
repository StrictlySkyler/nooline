
module.exports = function updateIndex (type, info) {
  var fs = require('fs');
  var newIndex;

  function commitVersion (error) {
    // TODO: Add versioning here.  
    // Cross-reference against when snippet is saved.
    var update = 'Index updated:  \n'
      +'  Category: ' + type + '\n'
      +'  Snippet: ' + info.specific;
    if (error) {
      console.error(error);
    } else {
      console.log(update);
    }
  }

  if (info.specific <= info.indexList.count) {
    info.indexList.count++;
    info.specific = info.indexList.count;
  }

  info.next(info.setup.models[0], info);

  info.indexList.categories[type].push(info.specific);

  newIndex = JSON.stringify(info.indexList, null, '\t');

  fs.writeFile(info.index, newIndex, commitVersion);
};