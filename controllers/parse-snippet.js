
module.exports = function parseSnippet (error, data, req, res, info) {
  var content;
  
  if (error) {
    console.error(error);
  } else {
    try {
      data = JSON.parse(data);
    } catch (fail) {
      console.error(fail);
    }
    
    switch (info.type) {
      case 'dates':
        info.setup.source.timeline.date.push(data);
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
        info.next(content);
      }
    }
  }
};