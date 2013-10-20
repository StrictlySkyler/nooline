
;(function loadGetContent(N) {

  // TODO: Perhaps swap this for Backbone.sync eventually.
  function parseContent (content) {

    content = JSON.parse(content);

    var category = new N.Models.Category({
      type: content.type,
      url: '/' + content.type
    });

    var snippets = new N.Collections.Snippets(content.snippets, {
      model: N.Models.ContentSnippet
    });
    snippets.url = '/' + content.type;

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
    'nooline/views/content-snippet-view'
  ]);

  N.getContent = function (meta, next) {
    
    $.get('/content-categories', meta, [next, parseContent]);
  };
  
}(window.Nooline));