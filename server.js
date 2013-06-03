
var express = require('express');
var nooline = express();
var http = require('http');
var routes = require('./routes');
var chromelogger = require('chromelogger');

nooline.use(chromelogger.middleware);
nooline.use(nooline.router);
nooline.use(express.logger('dev'));
nooline.use(express.bodyParser());
nooline.use(express.static('public'));
nooline.use(function set404 (req, res) {
  res.status(404).render('error', {
    status: '404',
    message: "Whaaaat!  Looks like the thing you're looking for doesn't exist.",
    redirect: nooline.settings.redirect,
    port: nooline.settings.prettyport
  });
});
nooline.use(function set500 (error, req, res, next) {
  res.status(500).render('error', {
    status: '500',
    message: 'Boom.  The dynamite has dropped.  On the server.  And this is your error.',
    redirect: nooline.settings.redirect,
    port: nooline.settings.prettyport,
    error: error
  });
  next();
});

// TODO: Turn these into a settings json file.
var engine = 'hogan';
nooline.set('port', process.env.PORT || 3000);
nooline.set('view engine', 'html');
nooline.engine('html', require('consolidate')[engine]);
nooline.set('express', express);
nooline.set('views', __dirname + '/views');
nooline.set('redirect', 'nooline.org');
nooline.set('partials', '/views/partials');
nooline.set('prettyport', function () {
  if (nooline.settings.port !== 80
    || nooline.settings.port !== 443) {
    return ':' + nooline.settings.port;
  } else {
    return '';
  }
}());

nooline.get('/', routes.root);
nooline.get('/content', routes.content);
nooline.get('/:category', routes.category);
nooline.get('/:category/:index', routes.category);

http.createServer(nooline).listen(nooline.settings.port, function started() {
  console.log('Nooline started listening on ' + nooline.settings.port);
});