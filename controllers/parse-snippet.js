
module.exports = function parseSnippet (error, data, req, res, info) {
  var content;
  var error404 = require('../routes/error-404');
  
  if (error) {
    error404(error, info);
  } else {
    try {
      data = JSON.parse(data);
    } catch (fail) {
      error404(fail, info);
    }
    
    switch (info.type) {
      case 'dates':
        info.setup.source.timeline.date.push(data);
        info.setup.snippets.push(data);
        break;
      default:
        info.setup.snippets.push(data);
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