// Boilerplate allows this to work with both AMD and CJS style requires.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/collections/snippets', [], function (){
    
  var root = this;
  var N = root.window ? root.Nooline : null;
  var Backbone = root.Backbone || require('backbone');

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

      if (typeof module === 'undefined') {
        this.bindEvents();
      }
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

  if (typeof module !== 'undefined') {

    module.exports = Snippets;
    return module.exports;

  } else {

    N.Collections = N.Collections || {};
    N.Collections.Snippets = Snippets;

    require(['common/js/nooline/collections/snippets/setup']);

  }
    
  // For RequireJS.
  return 'collections/snippets';
});
