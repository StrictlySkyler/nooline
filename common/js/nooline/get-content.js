
;(function loadGetContent(N) {

  // TODO: Perhaps swap this for Backbone.sync eventually.
  function parseContent (content) {

    var category = new N.Models.Category(content);

    var snippets = new N.Collections.Snippets(content.snippets, {
      model: N.Models.ContentSnippet
    });

    category.set('url', '/' + content.type);
    snippets.url = '/' + content.type;
    snippets.category = category;

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
    'nooline/collections/content-categories',
    'nooline/collections/snippets',
    'nooline/models/category',
    'nooline/models/content-snippet',
    'nooline/views/category-view',
    'nooline/views/content-snippet-view'
  ]);

  N.getContent = function (meta, next) {
    
    $.get('/content-categories', meta, function parseResults (data) {
      data = JSON.parse(data);
      
      if (next) {
        next(data);
      }
      parseContent(data);
    });
  };
  
}(window.Nooline));