
module.exports = function buildMeta (error, data, info) {
  
  var fs = require('fs');
  var getIndex = require('./get-index');
  var error404 = require('../routes/error-404');
  
  var Snippets = require('../common/js/nooline/collections/snippets');
  
  function reportIndex (error, data) {
    getIndex(error, data, info);
  }
  
  info.index = info.contentPath + '/index.json';
  
  if (error) {
    error404(error, info);
  } else {
    try {
      data = JSON.parse(data);

      info.setup[data.type] = data;

      info.setup[data.type].snippets = new Snippets();

      info.metaLoaded++;

    } catch (fail) {
      error404(fail, info);
    }

    if (info.metaLoaded === info.categories.length) {

      info.categoriesLoaded = 0;

      fs.readFile(info.index, 'utf8', reportIndex);

    }
    
  }
};