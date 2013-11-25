/*!
 * socket.io-node
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

!function(o,e){o.exports={"client version number":function(){e.version.should().match(/([0-9]+)\.([0-9]+)\.([0-9]+)/)},"socket.io protocol version":function(){e.protocol.should().be.a("number"),(""+e.protocol).should().match(/^\d+$/)},"socket.io available transports":function(){(e.transports.length>0).should().be_true}}}("undefined"==typeof module?module={}:module,"undefined"==typeof io?null:io,"undefined"==typeof should?null:should);