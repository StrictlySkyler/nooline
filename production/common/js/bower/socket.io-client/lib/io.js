/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

!function(o,t){var e=o;e.version="0.9.16",e.protocol=1,e.transports=[],e.j=[],e.sockets={},"object"==typeof module&&"function"==typeof require&&(e.util=null.util,e.JSON=null.JSON,e.parser=null.parser,e.EventEmitter=null.EventEmitter,e.SocketNamespace=null.SocketNamespace,e.Transport=null.Transport,e.transports=["websocket","xhr-polling"],e.Transport.XHR=null.XHR,e.transports.forEach(function(o){e.Transport[o]=require("./transports/"+o)[o]}),e.Socket=null.Socket,e.dist=__dirname+"/../dist",e.builder=null),e.connect=function(o,r){var n,c,l,s=e.util.parseUri(o);return t&&t.location&&(s.protocol=s.protocol||t.location.protocol.slice(0,-1),s.host=s.host||(t.document?t.document.domain:t.location.hostname),s.port=s.port||t.location.port),n=e.util.uniqueUri(s),l={host:s.host,secure:"https"==s.protocol,port:s.port||("https"==s.protocol?443:80),query:s.query||""},e.util.merge(l,r),(l["force new connection"]||!e.sockets[n])&&(c=new e.Socket(l)),!l["force new connection"]&&c&&(e.sockets[n]=c),c=c||e.sockets[n],c.of(s.path.length>1?s.path:"")}}("object"==typeof module?module.exports:this.io={},this);