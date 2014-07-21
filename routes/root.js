
/**
 * @route root
 * Handles the root (/) request.
 *
 * Determines which are the base categories for the root of the page, and
 * delegates loading them down the async chain.  Also sets the user error
 * text if the domain doesn't exist.
 *
 * @param req
 * @param res
 * @return
 */
module.exports = function root (req, res) {
  var content = require('./content');
  // TODO: Move this into the contentcategories view.
  var renderTemplate = require('../controllers/render-template');
  var info = {};
  var config;
  var ERROR_MESSAGE = "Looks like that domain doesn't exist yet.";
  var ERROR_DETAIL = "For the technies:  "
    + "Try checking the <span class=\"files tech-term\">views/"
    + "</span> folder to ensure one exists for this domain's <span "
    + "class=\"tech-term\">root"
    + "</span> (" + info.domain + " + /) view.  Otherwise, perhaps the "
    + "specific route for this domain and path are missing.";
  var TEMPLATE = '/root';

  info.domain = req.host;
  info.nooline = req.app;
  config = require(GLOBAL.__root
    + '/sites/'
    + info.domain
    + '/config/site.json'
  );

  info.errorMessage = ERROR_MESSAGE;
  info.errorDetail = ERROR_DETAIL;
  info.template = TEMPLATE;

  info.next = renderTemplate;
  info.categories = config.categories;

  content(req, res, info);

};
