
module.exports = function content (req, res, info) {
  var fs = require('fs');
  var buildMeta = require('../controllers/build-meta');
  var ContentCategories = 
    require('../common/js/nooline/collections/content-categories');
  var i;

  function reportMeta (error, data) {
    buildMeta(error, data, info);
  }
  
  info.req = req ? req : info.req;
  info.res = res ? res : info.res;
  info.metaLoaded = 0;
  info.categories = info.req.query.type ? 
    [info.req.query.type] : 
    info.categories;
  info.contentPath = './sites/' + info.req.host + '/content';
  info.meta = {};
  info.setup = new ContentCategories();

  if (req && req.query.type) {
    info.query = true;
  }

  for (i = 0; i < info.categories.length; i++) {
    info.meta[info.categories[i]] = info.contentPath 
      + '/meta/' 
      + info.categories[i]
      + '.json';

    fs.readFile(info.meta[info.categories[i]], 'utf8', reportMeta);

  }
};