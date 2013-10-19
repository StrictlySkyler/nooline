
module.exports = function parseSnippet (error, data, info, category) {

  var error404 = require('../routes/error-404');

  var ContentSnippet = require('../common/js/nooline/models/content-snippet');

  var snippet;

  info.content = info.content || {};
  
  if (error) {
    error404(error, info);
  } else {
    try {
      data = JSON.parse(data);

      snippet = new ContentSnippet(data);
      
    } catch (fail) {
      error404(fail, info);
    }
    
    // Theoretically specific things could be needed for each category.
    // This should be abstracted away, or normalized.
    // Look into this later.
    switch (category) {
      case 'timeline':
        info.setup.findWhere({type: category})
          .get('source').timeline.date.push(data);
        break;
      default:
        break;
    }

    info.setup.findWhere({type: category}).get('snippets').add(snippet);
    
    info.categories[category].currentIndex++;
    
    if (info.categories[category].currentIndex 
        === info.categories[category].totalFiles) {

      info.content[category] = info.setup.findWhere({type: category});
    
      info.categoriesLoaded++;
    }

    if (info.categoriesLoaded === info.categories.length) {
      
      if (info.specific) {
        info.content = info.content[category];
      }

      if (info.query) {
        info.res.send(JSON.stringify(info.content));
      }

      if (info.next) {
        info.next(info.content, info);
      }
    }
  }
};