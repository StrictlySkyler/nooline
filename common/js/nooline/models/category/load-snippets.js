// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/models/category/load-snippets', [], function () {

  var N = this.Nooline;

  /**
   * Load the data from a content snippet's file as a ContentSnippet model,
   * and add it to the Snippets collection associated with this Category.
   * @param  {Object} error Couldn't load the file.
   * @param  {String} data  JSON string of the snippet file's contents.
   * @param  {Number} index The guid index of the content snippet.
   * @return {Ojbect}       The Category model itself.
   */
  N.Models.Category.prototype.loadSnippets = function (error, data, index) {
    var error404;
    var ContentSnippet;
    var snippet;

    if (typeof module !== 'undefined') {

      error404 = require(__root + '/routes/error-404');
      ContentSnippet = require('../content-snippet');

      if (error) {

        console.error(error);
        error404(error, this.get('info'));

      } else {

        try {

          snippet = new ContentSnippet();

          snippet
            .set(JSON.parse(data))
            .set('index', index)
            ;

          this.get('snippets').add(snippet);

          this.trigger('snippet:loaded');

        } catch (fail) {

          console.error('Unable to load snippet!',
            '\n\tType: ' + this.get('type'),
            '\n\tWhich: ' + index + '.json'
          );

          error404(fail, this.get('info'));
        }
      }

    }

    return this;

  };
});
