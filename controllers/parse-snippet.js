
module.exports = function parseSnippet (error, data, info, category) {

  var content;
  var error404 = require('../routes/error-404');

  var ContentSnippet = require('../common/js/nooline/models/content-snippet');

  var snippet;
  
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
        info.setup[category].source.timeline.date.push(data);
        break;
      default:
        break;
    }

    info.setup[category].snippets.add(snippet);
    
    info.categories[category].currentIndex++;
    
    if (info.categories[category].currentIndex 
        === info.categories[category].totalFiles) {

      info.categoriesLoaded++;
    }

    if (info.categoriesLoaded === info.categories.length) {

      content = info.setup;

      if (info.ajax) {
        info.res.send(JSON.stringify(content));
      }

      if (info.next) {
        info.next(content, info);
      }
    }
  }
};