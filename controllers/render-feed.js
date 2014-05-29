
/**
 * renderFeed
 * Render an RSS feed.
 *
 * Called instead of rendering content out to the browser.  Takes all the
 * content passed to it, assembles it as an RSS feed, and sends it back to
 * the client.  All we really need here is the metadata around the snippets
 * requested, along with their canonical urls; the RSS clients will use those
 * to pull down the content themselves, so we don't need to worry about it.
 *
 * @param content {Object}  Contains the content usually used to render to
 *                          a template.  We don't need it for what we'll do
 *                          here, but will receive it anyway as part of the
 *                          assumptions made upstream.
 * @param info    {Object}  Context object containing references.
 * @return
 */
module.exports = function renderFeed (content, info) {

  var xml;
  
  Object.keys(content).forEach(function eachCategory (category) {

    var snippets = content[category].get('snippets');

    snippets.each(function eachSnippet (snippet, index) {

      info.feed.item({
        title: snippet.get('headline'),
        description: snippet.get('text'),
        url: info.req.protocol + '://'
          + info.req.host + '/'
          + content[category].get('type') + '/'
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
