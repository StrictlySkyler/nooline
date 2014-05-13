
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
  var siteConfig = './sites/' + info.domain + '/config/site.js';
  var fs = require('fs');

  /**
   * getSiteConfig
   * Loads the config data for the site being requested.
   *
   * The site config file contains the location of the partials to use in the
   * various templates.
   *
   * @param error {Object}  Yikes!  No site config?
   * @param data  {String}  JS file containing site config data to eval.
   * @return
   */
  fs.readFile(siteConfig, 'utf8', function getSiteConfig (error, data) {
    if (error) {
      throw error;
    }

    data = eval(data);

    content.currentYear = new Date().getFullYear();
    content.partials = data.partials;

    // TODO: Make this configurable.
    if (data.mode === 'production') {
      content.startPath = '/production/common/js/nooline/start';

    } else {
      content.startPath = '/common/js/nooline/start';

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
      } else {
        info.res.send(html);
      }
    });
  });
  
};
