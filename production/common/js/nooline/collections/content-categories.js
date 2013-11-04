
define("common/js/nooline/collections/content-categories", function(){
  ;(function buildContentCategoriesCollection () {
    
    var root = this;
    var N = root.Nooline;
    var Backbone = root.Backbone || null;

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

    } else {

      N.Collections = N.Collections || {};
      N.Collections.ContentCategories = ContentCategories;

      require(['common/js/nooline/collections/content-categories/setup']);

    }

  }).call(this);
});