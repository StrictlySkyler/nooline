
define("common/js/nooline/models/category", function(){
  ;(function buildCategoryModel () {
    
    var root = this;
    var N = root.Nooline;
    var Backbone = root.Backbone || null;
    var CategoryView;

    var Category = Backbone.Model.extend({
      constructor: function Category () {

        var id;

        Backbone.Model.apply(this, arguments);

        if (typeof root.document !== 'undefined') {

          id = document.getElementById(this.get('type'));
          CategoryView = N.Views.CategoryView;

          this.bindEvents();

        } else {

          CategoryView = null;

          Backbone.$ = null;
        }

        this.view = new CategoryView({
          model: this,
          el: id
        });
      }
    });

    if (typeof module !== 'undefined') {

      module.exports = Category;

    } else {

      N.Models = N.Models || {};
      N.Models.Category = Category;

      require(['common/js/nooline/models/category/setup']);

    }

  }).call(this);
});