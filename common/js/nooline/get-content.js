
;(function loadGetContent(N) {

  function parseContent (content) {

    content = JSON.parse(content);

    var category = new N.Models.Category({
      type: content.type
    });

    var snippets = new N.Collections.Snippets(content.snippets, {
      model: N.Models.ContentSnippet
    });

    category.set('snippets', snippets);

    N.contentCategories.add(category);

  }

  require([
    'nooline/collections/content-categories',
    'nooline/collections/snippets',
    'nooline/models/category',
    'nooline/models/content-snippet',
    'nooline/views/snippet-view'
  ]);

  N.getContent = function (meta, next) {
    
    $.get('/content', meta, [next, parseContent]);
  };
  
}(window.Nooline));