
module.exports = function renderTemplate (content, info) {
  var error404 = require('../routes/error-404');
  var siteConfig = './sites/' + info.domain + '/config/site.js';
  var fs = require('fs');

  fs.readFile(siteConfig, 'utf8', function getSiteConfig (error, data) {
    if (error) {
      throw error;
    }

    data = eval(data);

    content.currentYear = new Date().getFullYear();
    content.partials = data.partials;

    if (data.mode === 'production') {
      content.startPath = '/production/common/js/nooline/start';

    } else {
      content.startPath = '/common/js/nooline/start';

    }
    
    info.res.render('sites/' 
      + info.domain 
      + '/views'
      + info.template, content, function sendRendering (error, html) {

      if (error) {
        error404(error, info);
      } else {
        info.res.send(html);
      }
    });
  });
  
};