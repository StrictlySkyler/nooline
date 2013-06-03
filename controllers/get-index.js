
module.exports = function getIndex (error, data, req, res, info) {
  var loadSnippets = require('./load-snippets');
  var renderError = require('../routes/render-error');
    
  if (error) {
    renderError(error, info);
  } else {
    
    try {
      data = JSON.parse(data);
      
      loadSnippets(data[info.type], req, res, info);
      
    } catch (fail) {
      renderError(fail, info);
    }
  }
    
};