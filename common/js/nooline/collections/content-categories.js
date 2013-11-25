
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/collections/content-categories', [], function () {
    
  var root = this;
  var N = this.window ? root.Nooline : null;
  var Backbone = root.Backbone || require('backbone');

  var ContentCategories = Backbone.Collection.extend({
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

  return 'collections/content-categories';
});