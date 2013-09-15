
module.exports = function feed (req, res) {

  var renderFeed = require('../controllers/render-feed');
  var content = require('./content');
  var RSS = require('rss');
  var fs = require('fs');

  var info = {};
  var configpath = './sites/' + req.host + '/config/feed.json';
  var config;

  info.next = renderFeed;

  fs.readFile(configpath, 'utf8', function loadConfig (error, data) {
    if (error) {
      throw error;
    }

    try {

      config = JSON.parse(data);

      info.feed = new RSS(config);
      info.categories = config.categories;

      content(req, res, info);

    } catch (error) {
      throw error;
    }
  });

};