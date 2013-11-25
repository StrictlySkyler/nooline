/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

!function(t,e){function o(){e.Transport.websocket.apply(this,arguments)}t.flashsocket=o,e.util.inherit(o,e.Transport.websocket),o.prototype.name="flashsocket",o.prototype.open=function(){var t=this,o=arguments;return WebSocket.__addTask(function(){e.Transport.websocket.prototype.open.apply(t,o)}),this},o.prototype.send=function(){var t=this,o=arguments;return WebSocket.__addTask(function(){e.Transport.websocket.prototype.send.apply(t,o)}),this},o.prototype.close=function(){return WebSocket.__tasks.length=0,e.Transport.websocket.prototype.close.call(this),this},o.prototype.ready=function(t,n){function s(){var e=t.options,s=e["flash policy port"],i=["http"+(e.secure?"s":"")+":/",e.host+":"+e.port,e.resource,"static/flashsocket","WebSocketMain"+(t.isXDomain()?"Insecure":"")+".swf"];o.loaded||("undefined"==typeof WEB_SOCKET_SWF_LOCATION&&(WEB_SOCKET_SWF_LOCATION=i.join("/")),843!==s&&WebSocket.loadFlashPolicyFile("xmlsocket://"+e.host+":"+s),WebSocket.__initialize(),o.loaded=!0),n.call(r)}var r=this;return document.body?s():(e.util.load(s),void 0)},o.check=function(){return"undefined"!=typeof WebSocket&&"__initialize"in WebSocket&&swfobject?swfobject.getFlashPlayerVersion().major>=10:!1},o.xdomainCheck=function(){return!0},"undefined"!=typeof window&&(WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=!0),e.transports.push("flashsocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports);