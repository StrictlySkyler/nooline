
var express = require('express');
var nooline = express();
var http = require('http');
var routes = require('./routes');

nooline.use(require('express-chrome-logger'));
nooline.use(express.logger('dev'));
nooline.use(express.bodyParser());
nooline.use(nooline.router);
nooline.use('/common', express.static(__dirname + '/common'));
nooline.use('/sites', express.static(__dirname + '/sites'));
nooline.use('/node_modules', express.static(__dirname + '/node_modules'));
nooline.use(function set404 (req, res) {
  res.status(404).render('common/views/error', {
    status: '404',
    message: "Whaaaat!  Looks like the thing you're looking for doesn't exist.",
    redirect: nooline.settings.redirect,
    port: nooline.settings.prettyport
  });
});
nooline.use(function set500 (error, req, res, next) {
  res.status(500).render('common/views/error', {
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
nooline.set('views', __dirname + '/');
nooline.set('redirect', 'nooline.org');
nooline.set('prettyport', function () {
  if (nooline.settings.port !== 80
    || nooline.settings.port !== 443) {
    return ':' + nooline.settings.port;
  } else {
    return '';
  }
}());

// TODO: Turn these routes into a JSON file.
nooline.get('/', routes.root);
nooline.get('/content', routes.content);
nooline.get('/:category', routes.category);
nooline.get('/:category/:index', routes.category);
nooline.post('/login', routes.login);

http.createServer(nooline).listen(nooline.settings.port, function started() {
  console.log('Nooline started listening on ' + nooline.settings.port);
});