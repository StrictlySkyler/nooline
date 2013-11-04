

;(function buildFindAllContent (N) {
  
  N.Collections.ContentCategories.prototype.findAllContent = function () {

    var allContent = new Backbone.Collection();
    
    this.each(function eachCategory (category) {

      allContent.add(category.get('snippets').models);
    });

    return allContent;
  };

}(window.Nooline));