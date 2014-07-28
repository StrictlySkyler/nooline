// Boilerplate allows this to work with both AMD and CJS style requires.
define('common/js/nooline/collections/snippets', [
    'node_modules/backbone/backbone'
  ], function (){

  var root = this;
  var N = root.Nooline = root.Nooline || {};
  var Backbone = root.Backbone || require('backbone');
  var component = ['common/js/nooline/collections/snippets/setup'];

  /**
   * @collection Snippets
   * Defines a collection of content snippets.
   *
   * This is usually synonymous with a type of content.  Differs from the
   * Category model.  Allows for operations to be done on each of the
   * snippets contained in the collection.
   * Used in both client and server ops.
   *
   * @return  {Object|undefined}  Module export for server, none for clients.
   */
  var Snippets = Backbone.Collection.extend({
    /**
     * @constructor Snippets
     * Sets up inheritance, and binds events if we're on the client.
     *
     * @return  None.
     */
    constructor: function Snippets () {
      Backbone.Collection.apply(this, arguments);

      if (typeof module !== 'undefined') {
        require('./snippets/setup');
      }

      this.bindEvents();
    },
    /**
     * comparator
     * Sorts snippets in the collection based on their index.
     *
     * @param a {Object}  A given snippet.
     * @param b {Object}  Another given snippet.
     * @return  {Number}  Used for sorting; positive means lower array index.
     */
    comparator: function (a, b) {

      if (a.get('index') < b.get('index')) {
        return 1;
      }
    }
  });

  N.Collections = N.Collections || {};
  N.Collections.Snippets = Snippets;

  if (typeof module !== 'undefined') {

    module.exports = Snippets;
    return module.exports;

  } else {

    N.componentsLoading.concat(component);
    require(
      ['common/js/nooline/collections/snippets/setup'],
      function removeLoaded () {

      N.componentsLoading = _.difference(N.componentsLoading, component);

      if (!N.componentsLoading.length) {
        N.$document.trigger('components:complete');
      }
    });

  }

  // For RequireJS.
  // return 'collections/snippets';
});
