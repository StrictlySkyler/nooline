
module.exports = function renderFeed (content, info) {

  var xml;
  
  info.setup.each(function eachCategory (category) {

    var snippets = category.get('snippets');

    snippets.each(function eachSnippet (snippet, index) {

      info.feed.item({
        title: snippet.get('headline'),
        description: snippet.get('text'),
        url: info.req.protocol + '://'
          + info.req.host + '/'
          + category.get('type') + '/'
          + (index + 1),
        guid: snippet.get('uuid'),
        categories: snippet.get('tags'),
        author: snippet.get('author'),
        date: snippet.get('startDate'),
        lat: snippet.get('lat'),
        long: snippet.get('long')
      });
    });
  });

  xml = info.feed.xml('\t');

  info.res.send(xml);

};