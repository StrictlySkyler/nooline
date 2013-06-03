
module.exports = function content (req, res, info) {
  var fs = require('fs');
  var buildMeta = require('../controllers/build-meta');
  
  info.type = req.query.type || info.type;
  info.contentPath = './content/' + req.host,
  info.meta = info.contentPath + '/meta/' + info.type + '.json';

  fs.readFile(info.meta, 'utf8', function reportMeta (error, data) {
    buildMeta(error, data, req, res, info);
  });
};