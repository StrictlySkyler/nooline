
module.exports = function root (req, res) {
  var content = require('./content');
  var domain = req.host;
  var nooline = req.app;
  var message = "Looks like that domain doesn't exist yet.";
  var detail = "Try checking your <span class=\"files tech-term\">views/"
    + "</span> to ensure one exists for this domain's <span "
    + "class=\"tech-term\">root"
    + "</span> (" + domain + " + /).  Otherwise, perhaps the specific "
    + "route for this domain and path are missing.";
  var next = {};
  
  function renderError (error) {
    console.error(error);
    
    res.status(404).render('error', {
      status: 404,
      message: message,
      redirect: nooline.settings.redirect,
      port: nooline.settings.prettyport,
      error: detail
    });
  }
  
  next.followup = function renderRoot (scroll) {
    
    res.render(domain + '/root', scroll, function(error, html) {
      if (error) {
        renderError(error);
      } else {
        res.send(html);
      }
    });
  };
  next.type = 'scroll';
  
  content(req, null, next);
  
};