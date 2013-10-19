
module.exports = function getcategory (req, res) {
  
  var content = require('./content');
  var renderTemplate = require('../controllers/render-template');
  var info = {};
  var index = parseInt(req.params.index, 10);

  info.domain = req.host;
  // TODO:
  // Put thse strings into the config json.
  info.errorMessage = "Looks like there isn't any content for that yet.  "
    + "Are you sure you typed the url correctly?";
  info.errorDetail = "For the techies:  "
    + "The <span class\"tech-term\">index</span> might not have any "
    + "content registered for this category.  Try checking the <span "
    + "class=\"files\">index.json</span> file, probably located in "
    + "<span class=\"files\">[nooline root folder]/content/" + info.domain 
    + "</span> to ensure it has a reference for this category.";
  info.template = '/category';
  info.nooline = req.app;
  info.next = renderTemplate;
  info.categories = [req.params.category];
  info.specific = Number.isNaN(index) ? 'all' : index;
  
  content(req, res, info);
};