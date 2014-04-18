
define(function () {
  var N = window.Nooline;

  // TODO: Swap this for Backbone.sync eventually.
  /**
   * parseContent
   * Parse the content we've received from the server.
   *
   * Create the categories, add the snippets to them, but don't render yet.
   * Some of the snippets have other libraries creating their DOM elements
   * (like in the Timeline), so we'll assign the elements later when they're
   * ready.
   *
   * @param content {Object}  Contains a category with its snippets.
   * @return                  None.
   */
  function parseContent (content) {

    var category = new N.Models.Category(content);

    var snippets = new N.Collections.Snippets(content.snippets, {
      model: N.Models.ContentSnippet
    });

    category.set('url', '/' + content.type);
    snippets.url = '/' + content.type;
    snippets.category = category;

    /**
     * setType
     * Give each snippet some info about itself.
     *
     * This way when updated, the snippets will send their updates off to the
     * server on their own, and don't need to be governed by any helpers.
     *
     * @param snippet {Object}  The snippet in question.
     * @return                  None.
     */
    snippets.each(function setType (snippet) {
      snippet.set({
        type: content.type,
        url: '/' + content.type + '/' + snippet.get('index')
      }, {
        silent: true // No render yet - not finished building the element.
      });
    });
    
    category.set('snippets', snippets);

    N.contentCategories.add(category);

  }

  require([
    'common/js/nooline/collections/content-categories',
    'common/js/nooline/collections/snippets',
    'common/js/nooline/models/category',
    'common/js/nooline/models/content-snippet',
    'common/js/nooline/views/category-view',
    'common/js/nooline/views/content-snippet-view'
  ]);

  /**
   * getContent
   * Grabs all of the content for specified categories.
   *
   * Called when we want to load all of the content of a certain type(s), and
   * at bootup.
   *
   * @param meta  {Object}    Data about which types of categories we want.
   * @param next  {Function}  Any other function to call on the content, in 
   *                          addition to parsing it.
   *                          TODO: Make this a list.
   * @return
   */
  N.getContent = function (meta, next) {
    
    $.get('/content-categories', meta, function parseResults (data) {
      data = JSON.parse(data);
      
      if (next) {
        next(data);
      }
      parseContent(data);
    });
  };
  
});
