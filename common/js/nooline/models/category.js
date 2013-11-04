
({ define: typeof define === "function"
  ? define
  : function(A,F) { 
    exports = module.exports = F(); 
  } 
}).define("common/js/nooline/models/category", function(){
  return (function buildCategoryModel () {
    
    var root = this;
    var N = root.Nooline;
    var Backbone = root.Backbone || require('backbone');
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

          CategoryView = require('../views/category-view');

          Backbone.$ = require('jquery');
        }

        this.view = new CategoryView({
          model: this,
          el: id
        });
      }
    });

    if (typeof module !== 'undefined') {

      module.exports = Category;
      return module.exports;

    } else {

      N.Models = N.Models || {};
      N.Models.Category = Category;

      require(['common/js/nooline/models/category/setup']);

    }

  }).call(this);
});