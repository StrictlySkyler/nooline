
module.exports = function buildMeta (error, data, req, res, info) {
  
  var fs = require('fs');
  var getIndex = require('./get-index');
  var renderError = require('../routes/render-error');
  
  function reportIndex (error, data) {
    getIndex(error, data, req, res, info);
  }
  
  info.index = info.contentPath + '/index.json';
  
  if (error) {
    renderError(error, info);
  } else {
    try {
      info.setup = JSON.parse(data);
    } catch (fail) {
      renderError(fail, info);
    }
    
    fs.readFile(info.index, 'utf8', reportIndex);
  }
};