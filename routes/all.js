
exports.root = function root (req, res) {
  var site = req.host;
  var nooline = req.app;
  
  res.render(site + '/root', function(error, html) {
    var message = "Looks like that domain doesn't exist yet.";
    var detail = "Try checking your <span class=\"files tech-term\">views/"
      + "</span> to ensure one exists for this domain's <span "
      + "class=\"tech-term\">root"
      + "</span> (" + site + " + /).  Otherwise, perhaps the specific "
      + "route for this domain and path are missing.";
    
    if (error) {
      res.status(404).render('error', {
        status: 404,
        message: message,
        redirect: nooline.settings.redirect,
        port: nooline.settings.prettyport,
        error: detail
      });
    } else {
      res.send(html);
    }
    
  });
  
};