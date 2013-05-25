var nooline = require('express')();
var winston = require('winston');
var expressWinston = require('express-winston');
var http = require('http');
var path = require('path');
var routes = require('./routes');

console.log(routes.root.root());

// nooline.use(nooline.router);
nooline.use(expressWinston.errorLogger({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true
    }),
    new (winston.transports.File)({
      level: 'info',
      colorize: true,
      timestamp: true,
      filename: 'logs/nooline.log',
      json: false
    })
  ]
}));
