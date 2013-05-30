
module.exports = function buildMeta (error, data, req, res, info) {
  
  var fs = require('fs');
  var getIndex = require('./get-index');
  info.index = info.domain + '/index.json';
  
  if (error) {
    console.error(error);
  } else {
    try {
      info.setup = JSON.parse(data);
    } catch (fail) {
      console.error(fail);
    }
    
    fs.readFile(info.index, 'utf8', function reportIndex (error, data) {
      getIndex(error, data, req, res, info);
    });
  }
}