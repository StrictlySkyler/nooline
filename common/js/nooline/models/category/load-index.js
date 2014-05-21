// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/models/category/load-index', [], function () {

  var N = this.Nooline;

  /**
   * Loads the index for the content, and determines the individual pieces of
   * content to load, based on category.
   * @param  {Object} error Couldn't load the index file, it seems!
   * @param  {String} data  The JSON string of the index file.
   * @return {Object}       The Category model itself.
   */
  N.Models.Category.prototype.loadIndex = function (error, data) {
    var fs;
    var info;
    var error404;
    var snippetList;
      
    if (typeof module !== 'undefined') {
      error404 = require(__root + '/routes/error-404');
      fs = require('fs');

      if (error) { 

        error404(error, this.get('info'));

      } else {

        try {
          info = this.get('info');

          info.indexList = JSON.parse(data);

          snippetList = info.indexList.categories[this.get('type')];

          if (typeof info.specific == 'number') {
            snippetList = snippetList.filter(function (value, index) {
              return (index + 1) == info.specific;
            });
          }

          this.set({
            info: info,
            total: snippetList.length
          });

          /**
           * Loop through the list of snippets, and for each one, read the
           * file containing its contents.
           * @param  {Number} item The index of the content snippet.
           * @return None.  Executes async.
           */
          snippetList.forEach(function readSnippetFile (item) {

            fs.readFile(
              info.snippets + item + '.json',
              'utf8',
              /**
               * Call the loadSnippet method on the Category, binding the
               * Category model as scope for the function.
               * @param  {Object} error Couldn't read the snippet file.
               * @param  {String} data  JSON string of the file's contents.
               * @return None.
               */
              (function loadSnippetData (error, data) {

                this.loadSnippets(error, data, item);

              }).bind(this)
              );

          }, this);

        } catch (fail) {

          error404(fail, this.get('info'));
        }
      }
      
    }

    return this;

  };
});