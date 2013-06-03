
module.exports = function root (req, res) {
  var content = require('./content');
  var renderTemplate = require('./render-template');
  var info = {};
  
  info.domain = req.host;
  info.nooline = req.app;
  info.errorMessage = "Looks like that domain doesn't exist yet.";
  info.errorDetail = "For the technies:  "
    + "Try checking the <span class=\"files tech-term\">views/"
    + "</span> folder to ensure one exists for this domain's <span "
    + "class=\"tech-term\">root"
    + "</span> (" + info.domain + " + /) view.  Otherwise, perhaps the "
    + "specific route for this domain and path are missing.";
  info.template = '/root';
  info.res = res;
  
  info.next = renderTemplate;
  info.type = 'scroll';
  
  content(req, null, info);
  
};