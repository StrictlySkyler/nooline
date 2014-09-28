define('common/js/nooline/models/category/load-meta', [], function () {

  var N = this.Nooline;

  /**
   * Builds the metadata about a given content category, e.g. which index to
   * access, and anything else special to this category.
   * @param  {Object} error Error object if the metafile can't be read.
   * @param  {String} data  UTF-8 string containing metafile contents.
   * @return {Object}       Returns the Category model itself.
   */
  N.Models.Category.prototype.loadMeta = function (error, data) {
    var fs;
    var errorMessage;
    var error404;
      
    if (typeof module !== 'undefined') {
      errorMessage = 'No content found for: ' + this.get('info').domain + '/'
        + this.get('type')
        + '\n  Usually this is because the URL is wrong.'
        + '\n  Check your hosts file, and that this domain folder has content.';
      error404 = require(__root + '/routes/error-404');
      fs = require('fs');

      if (error) {

        console.error(new Error(errorMessage));
        error404(error, this.get('info'));

      } else {

        try {
          this.set(JSON.parse(data));

          fs.readFile(
            this.get('info').index, 
            'utf8', 
            this.loadIndex.bind(this)
          );

        } catch (fail) {

          error404(fail, this.get('info'));
        }
      }
      
    }

    return this;

  };
});
