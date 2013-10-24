
module.exports = function saveContent (category, info) {
  var snippets = category.get('snippets');
  var fs = require('fs');
  var path;

  function notifyClient (error) {
    // TODO: Add versioning here.  
    // Cross-reference against when index is updated.
    if (error) {
      console.error(error);
    } else {
      console.log('Content saved: ' + path);
      info.res.send(200);
    }
  }

  snippets.each(function setNewData (snippet) {
    var content;
    path = './sites/' 
      + info.domain 
      + '/content/snippets/' 
      + info.specific 
      + '.json';
    snippet.set(info.req.body);

    content = JSON.stringify(snippet.toJSON(), null, '\t');
    
    fs.writeFile(path, content, notifyClient);
  });

};