
module.exports = function getIndex (error, data, req, res, info) {
  var loadSnippets = require('./load-snippets');
    
  if (error) {
    console.error(error);
  } else {
    
    try {
      data = JSON.parse(data);
      
      loadSnippets(data[info.type], req, res, info);
      
    } catch (fail) {
      console.error(fail);
    }
  }
    
};