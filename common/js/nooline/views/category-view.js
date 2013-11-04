
define("common/js/nooline/views/category-view", function(){
  ;(function buildCategoryView () {
    
    var root = this;
    var N = root.Nooline;
    var Backbone = root.Backbone || require('backbone');

    var CategoryView = Backbone.View.extend({
      constructor: function CategoryView () {

        Backbone.View.apply(this, arguments);

        if (typeof module === 'undefined') {
          this.bindEvents();
        }
      },
      options: {}
    });

    if (typeof module !== 'undefined') {

      module.exports = CategoryView;

    } else {

      N.Views = N.Views || {};
      N.Views.CategoryView = CategoryView;
      require(['common/js/nooline/views/category-view/setup']);

    }

  }).call(this);
});