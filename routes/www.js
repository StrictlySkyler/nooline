
module.exports = function www (req, res, next) {

  var newURL;

  if (req.host.match(/www\./)) {
    newURL = req.protocol + '://' + req.headers.host.replace('www.', '');

    res.redirect(301, newURL);

  } else {

    next();
  }


};
