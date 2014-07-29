// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/views/category-view/render', [], function () {

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
    var config;
    var content;
    var info;

    if (!this.model.collection && typeof module !== 'undefined') {
      info = this.model.get('info');
      error404 = require(__root + '/routes/error-404');
      config = require(__root
        + '/sites/'
        + info.domain
        + '/config/site.json'
      );

      content = this.model;
      content.currentYear = new Date().getFullYear();
      content.partials = JSON.parse(JSON.stringify(config.partials)); // copy

      if (config.mode === 'production') {
        content.startPath = config.startPaths.production;

      } else {
        content.startPath = config.startPaths.debug;

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

    }

    return this;

  };

  // return 'views/category-view/render';

});
