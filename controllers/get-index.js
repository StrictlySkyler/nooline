
module.exports = function getIndex (error, data, req, res, info) {
  var loadSnippets = require('./load-snippets');
  var error404 = require('../routes/error-404');
    
  if (error) {
    error404(error, info);
  } else {
    
    try {
      data = JSON.parse(data);
      
      loadSnippets(data[info.type], req, res, info);
      
    } catch (fail) {
      error404(fail, info);
    }
  }
    
};