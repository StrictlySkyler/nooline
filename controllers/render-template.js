
/**
 * renderTemplate
 * Renders a specific template with content.
 *
 * Called at the end of a request for content, or from an error.  Assembles
 * the appropriate template, populates it with content, and sends it back to
 * the client.
 *
 * @param content {Object}  Contains all the content for a template.
 * @param info    {Object}  Contains references to other objects we need.
 * @return                  None.
 */
module.exports = function renderTemplate (content, info) {
  var error404 = require('../routes/error-404');
  var config = require(GLOBAL.__root
    + '/sites/'
    + info.domain
    + '/config/site.json'
  );

  content.currentYear = new Date().getFullYear();
  content.partials = config.partials;

  if (config.mode === 'production') {
    content.startPath = config.startPaths.production;

  } else {
    content.startPath = config.startPaths.debug;

  }

  info.res.render('sites/'
    + info.domain
    + '/views'
    /**
     * sendRendering
     * Send a rendered template back to the client.
     *
     * Either we receive an error because the files don't exist, or we send
     * the rendered template back to the client for it to hook onto.
     *
     * @param error {Object}  Missing template parts; partials perhaps?
     * @param html  {String}  String of HTML populated with content.
     * @return                None.
     */
    + info.template, content, function sendRendering (error, html) {

    if (error) {
      error404(error, info);
    } else if (!info.query) {
      info.res.send(html);
    }
  });

};
