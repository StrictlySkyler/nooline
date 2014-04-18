
define(function () {

  var N = window.Nooline;

  /**
   * findAllContent
   * Get all the content.
   *
   * Goes through each of the categories, and adds the content to a new
   * collection, discarding the category hierarchy (although the snippets
   * still maintain a reference, of course).
   *
   * @return  {Object}  A collection of all the content.
   */
  N.Collections.ContentCategories.prototype.findAllContent = function () {

    var allContent = new Backbone.Collection();
    
    this.each(function eachCategory (category) {

      allContent.add(category.get('snippets').models);
    });

    return allContent;
  };

  return 'collections/content-categories/find-all-content';

});
