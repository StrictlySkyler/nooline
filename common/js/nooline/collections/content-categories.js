// Boilerplate for loading via CJS and AMD both.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/collections/content-categories', [], function () {
    
  var root = this;
  var N = this.window ? root.Nooline : null;
  var Backbone = root.Backbone || require('backbone');

  /**
   * @collection ContentCategories
   * A collection of the categories.
   *
   * Contains references to all of the content on a given page, via the
   * categories collected in it.
   *
   * @return  {Object|undefined}  Module export for server, none for client.
   */
  var ContentCategories = Backbone.Collection.extend({
    /**
     * @constructor ContentCategories
     * Sets up inheritance and binds events.
     *
     * Only binds events if we're on the client.
     *
     * @return  None.
     */
    constructor: function ContentCategories () {
      Backbone.Collection.apply(this, arguments);

      if (typeof module === 'undefined') {
        this.bindEvents();
      }
      
    },

    url: '/content-categories'
  });

  if (typeof module !== 'undefined') {

    module.exports = ContentCategories;
    return module.exports;

  } else {

    N.Collections = N.Collections || {};
    N.Collections.ContentCategories = ContentCategories;

    require(['common/js/nooline/collections/content-categories/setup']);

  }

  // For RequireJS.
  return 'collections/content-categories';
});
