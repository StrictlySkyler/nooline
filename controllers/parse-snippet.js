
module.exports = function parseSnippet (error, data, req, res, info) {
  var content;
  var error404 = require('../routes/error-404');
  var Backbone = require('backbone');

  var ContentSnippet = Backbone.Model.extend({
    constructor: function ContentSnippet () {
      Backbone.Model.apply(this, arguments);
    }
  });

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
    
    switch (info.type) {
      case 'timeline':
        info.setup.source.timeline.date.push(data);
        info.setup.snippets.add(snippet);
        break;
      default:
        info.setup.snippets.add(snippet);
        break;
    }
    
    info.currentIndex++;
    
    if (info.currentIndex === info.totalFiles) {
      content = info.setup;
      if (res) {
        res.send(JSON.stringify(content));
      }
      
      if (info.next) {
        info.next(content, info);
      }
    }
  }
};