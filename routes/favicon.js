
module.exports = function favicon (req, res) {

  var fs = require('fs');
  var path = './sites/' + req.host + '/images/favicon.ico';

  fs.exists(path, function checkFavicon (exists) {

    if (exists) {
      res.sendfile(path);
    } else {
      res.sendfile('./sites/nooline.org/images/favicon.ico');
    }
    
  });
  
};