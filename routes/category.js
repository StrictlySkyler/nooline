
module.exports = function category (req, res) {
  var content = require('./content');
  var renderTemplate = require('./render-template');
  var info = {};
  var index = parseInt(req.params.index, 10);
  
  info.domain = req.host;
  info.nooline = req.app;
  info.errorMessage = "Looks like there isn't any content for that yet.  "
    + "Are you sure you typed the url correctly?";
  info.errorDetail = "For the techies:  "
    + "The <span class\"tech-term\">index</span> might not have any "
    + "content registered for this category.  Try checking the <span "
    + "class=\"files\">index.json</span> file, probably located in "
    + "<span class=\"files\">[nooline root folder]/content/" + info.domain 
    + "</span> to ensure it has a reference for this category.";
  info.template = '/category';
  info.res = res;
  info.next = renderTemplate;
  info.type = req.params.category;
  info.specific = Number.isNaN(index) ? null : index;
  
  content(req, null, info);
};