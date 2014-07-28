// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/collections/snippets/bind-events',
  [],
  function () {

  var N = this.Nooline;

  /**
   * bindEvents
   * Attach events to the collection of snippets.
   *
   * @return  None.
   */
  N.Collections.Snippets.prototype.bindEvents = function () {

    return this.on({
      'saveSnippets': this.saveSnippets,

      'snippet:saved': this.countSaved
    });
  };

  // return 'collections/snippets/bind-events';

});
