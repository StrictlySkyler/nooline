
define(function () {

  var N = window.Nooline;
  
  N.Views.CategoryView.prototype.createSnippet = function () {
    this.model.trigger('create');
  };

  return 'views/category-view/create-snippet';

});