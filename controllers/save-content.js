
module.exports = function saveContent (category, info) {
  var snippets = category.get('snippets');
  var fs = require('fs');

  function notifyClient (error) {
    if (error) {
      console.error(error);
    } else {
      info.res.send(200);
    }
  }

  snippets.each(function setNewData (snippet) {
    var content;
    var path = './sites/' 
      + info.domain 
      + '/content/snippets/' 
      + info.specific 
      + '.json';
    snippet.set(info.req.body);

    content = JSON.stringify(snippet.toJSON(), null, '\t');
    
    fs.writeFile(path, content, notifyClient);
  });

};