
var cluster = require('cluster');
var cpus;
var i;

var express;
var nooline;
var server;
var routes;
var io;
var engine;
var store = new (require('socket.io-clusterhub'));
var program  = require('commander');

program
  .option('-s, --single', 'Start without clustering')
  .option('-p, --port <n>', 'Port on which Nooline should listen', parseInt)
  .parse(process.argv);

if (cluster.isMaster && !program.single) {

  cpus = require('os').cpus();

  for (i = 0; i < cpus.length; i++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died!  Sad trombone.');

    cluster.fork();
  });

} else {

  express = require('express');
  nooline = express();
  server = require('http').createServer(nooline);
  routes = require('./routes');
  io = require('socket.io').listen(server, {
    'log level': 2
  });

  io.configure(function() {
    io.set('store', store);
  });

  nooline.use(require('express-chrome-logger'));
  nooline.use(express.logger('dev'));
  nooline.use(express.compress());
  nooline.use(express.cookieParser());
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
  engine = 'hogan';
  nooline.set('port', program.port || 3000);
  nooline.set('view engine', 'html');
  nooline.engine('html', require('consolidate')[engine]);
  nooline.set('express', express);
  nooline.set('views', __dirname + '/');
  nooline.set('redirect', 'nooline.org');
  nooline.set('EXPIRY', 3600000); // 1 hour = 3600000ms
  nooline.set('prettyport', function () {
    if (nooline.settings.port !== 80
      || nooline.settings.port !== 443) {
      return ':' + nooline.settings.port;
    } else {
      return '';
    }
  }());

  // Static gets
  nooline.get('/', routes.root);
  nooline.get('/content-categories', routes.content);
  nooline.get('/bootstrap', routes.bootstrap);
  nooline.get('/feed', routes.feed);
  nooline.get('/favicon.ico', routes.favicon);
  // Dynamic gets
  nooline.get('/:category', routes['get-category']);
  nooline.get('/:category/:index', routes['get-category']);
  // Static posts
  nooline.post('/login', routes.login);
  // Dynamic posts
  nooline.post('/:category', routes['post-category']);

  server.listen(nooline.settings.port, function started() {
    if (!program.single) {
      console.log('Nooline worker ' 
        + cluster.worker.id
        + ' started listening on ' 
        + nooline.settings.port);  
    } else {
      console.log('Nooline started listening single-threaded on '
        + nooline.settings.port);
    }
    
  });

  io.sockets.on('connection', function (socket) {
    // Not sure this is needed.  Might be able to simply emit events later,
    // e.g. when a content piece is saved.
  });

}