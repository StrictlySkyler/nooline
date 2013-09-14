
module.exports = function renderTemplate (content, info) {
  var error404 = require('./error-404');
  
  content.currentYear = new Date().getFullYear();
  // TODO: set this elsewhere, probably as a config?
  content.partials = {
    'head': 'partials/head',
    'timeline': 'partials/timeline',
    'scroll': 'partials/scroll',
    'global-header': 'partials/global-header',
    'meta': 'partials/meta',
    'global-footer': 'partials/global-footer',
    'global-scripts': 'partials/global-scripts'
  };
  content.type = info.type;
  
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
};