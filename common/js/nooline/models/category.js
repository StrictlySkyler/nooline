
;(function buildCategoryModel () {
  
  var root = this;
  var N = root.Nooline;
  var Backbone = root.Backbone || require('backbone');

  var Category = Backbone.Model.extend({
    constructor: function Category () {
      Backbone.Model.apply(this, arguments);

      if (typeof module === 'undefined') {
        this.bindEvents();
      }
    }
  });

  if (typeof module !== 'undefined') {

    module.exports = Category;

  } else {

    N.Models = N.Models || {};
    N.Models.Category = Category;

    require(['nooline/models/category/setup']);

  }

}).call(this);