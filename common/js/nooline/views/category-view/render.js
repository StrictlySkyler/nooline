// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/views/category-view/render', [], function () {

  var N = this.Nooline;
  
  /**
   * Assemble and provide a rendering of the data contained in this Category.
   *
   * When called from the server, this method provides all the markup and uses
   * the response object to send the data back to the client via a templating
   * engine, e.g. Hogan or Handlebars.
   *
   * When called from the cleint, this method updates any specific DOM elements
   * tied to the Category view, but not necessarily any child ContentSnippet
   * views.
   * @return {Object} The CategoryView itself.
   */
  N.Views.CategoryView.prototype.render = function () {
    var error404;
    var siteConfig;
    var fs;
    var content;
    var info;

    if (!this.model.collection && typeof module !== 'undefined') {
      info = this.model.get('info');
      error404 = require(__root + '/routes/error-404');
      siteConfig = __root 
        + '/sites/' 
        + info.domain 
        + '/config/site.js'
        ;
      fs = require('fs');

      fs.readFile(siteConfig, 'utf8', (function reportSiteConfig (error, data) {
        if (error) {
          throw error;
        }

        data = eval(data);

        content = this.model;
        content.currentYear = new Date().getFullYear();
        content.partials = data.partials;

        // TODO: Make this configurable.
        if (data.mode === 'production') {
          content.startPath = '/production/common/js/nooline/start';

        } else {
          content.startPath = '/common/js/nooline/start';

        }
        
        info.res.render(__root 
          + '/sites/' 
          + info.domain
          + '/views'
          + info.template,
          content,
          /**
           * sendRendering
           * Send a rendered template back to the client.
           *
           * Either we receive an error because the files don't exist, or 
           * we send the rendered template back to the client for it to hook 
           * onto.
           *
           * @param error {Object}  Missing template parts; partials perhaps?
           * @param html  {String}  String of HTML populated with content.
           * @return                None.
           */
          function sendRendering (error, html) {
            if (error) {

              error404(error);
            } else if (!info.query) {
              
              info.res.send(html);
            }
          });

      }).bind(this));
      
    }

    return this;

  };

  // return 'views/category-view/render';

});