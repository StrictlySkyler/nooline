
module.exports = function renderTemplate (content, info) {
  var renderError = require('./render-error');
  
  content.currentYear = new Date().getFullYear();
  // TODO: set this elsewhere, probably as a config?
  content.partials = {
    'head': 'partials/head',
    'timeline': 'partials/timeline',
    'scroll': 'partials/scroll',
    'global-header': 'partials/global-header',
    'global-footer': 'partials/global-footer',
    'global-scripts': 'partials/global-scripts'
  };
  content.type = info.type;
  
  info.res.render(info.domain + info.template, content, function(error, html) {
    if (error) {
      renderError(error, info);
    } else {
      info.res.send(html);
    }
  });
};