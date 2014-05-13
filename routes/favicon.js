
/**
 * @route favicon
 * Sends the favicon back to the client.
 *
 * TODO: Probably worth making this path overridable.
 *
 * @param {Object}  req   Express request object from the client.
 * @param {Object}  res   Express response object to send back.
 */
module.exports = function favicon (req, res) {

  var fs = require('fs');
  var path = './sites/' + req.host + '/images/favicon.ico';

  /**
   * If the site has a specific favicon, use it, otherwise use the default
   * nooline favicon.
   */
  fs.exists(path, function checkFavicon (exists) {

    if (exists) {
      res.sendfile(path);
    } else {
      res.sendfile('./sites/nooline.org/images/favicon.ico');
    }
    
  });
  
};
