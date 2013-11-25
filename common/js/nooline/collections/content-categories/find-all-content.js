
define(function () {

  var N = window.Nooline;

  N.Collections.ContentCategories.prototype.findAllContent = function () {

    var allContent = new Backbone.Collection();
    
    this.each(function eachCategory (category) {

      allContent.add(category.get('snippets').models);
    });

    return allContent;
  };

  return 'collections/content-categories/find-all-content';

});