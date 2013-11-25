/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

!function(t,o,r){function e(){o.Transport.XHR.apply(this,arguments)}function n(){}t["xhr-polling"]=e,o.util.inherit(e,o.Transport.XHR),o.util.merge(e,o.Transport.XHR),e.prototype.name="xhr-polling",e.prototype.heartbeats=function(){return!1},e.prototype.open=function(){var t=this;return o.Transport.XHR.prototype.open.call(t),!1},e.prototype.get=function(){function t(){4==this.readyState&&(this.onreadystatechange=n,200==this.status?(i.onData(this.responseText),i.get()):i.onClose())}function o(){this.onload=n,this.onerror=n,i.retryCounter=1,i.onData(this.responseText),i.get()}function e(){i.retryCounter++,!i.retryCounter||i.retryCounter>3?i.onClose():i.get()}if(this.isOpen){var i=this;this.xhr=this.request(),r.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=o,this.xhr.onerror=e):this.xhr.onreadystatechange=t,this.xhr.send(null)}},e.prototype.onClose=function(){if(o.Transport.XHR.prototype.onClose.call(this),this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=n;try{this.xhr.abort()}catch(t){}this.xhr=null}},e.prototype.ready=function(t,r){var e=this;o.util.defer(function(){r.call(e)})},o.transports.push("xhr-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);