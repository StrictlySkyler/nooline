define([],function(){function o(){e.contentCategories=new e.Collections.ContentCategories,n.length&&($("#timeline-placeholder").remove(),e.getContent({type:"timeline"},e.buildTimeline)),e.getContent({type:"scroll"})}var n,e=window.Nooline;window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,$(document.body).attr({id:"nooline"}),e.io=io.connect(),e.$document=$(document),$.get("/bootstrap",function(t){n=$("#timeline-placeholder"),e.settings=t.bootstrap.settings,sessionStorage.settings=JSON.stringify(t.bootstrap.settings),e.controls=t.controls,localStorage.controls=JSON.stringify(t.controls),require(["common/js/nooline/show-login-panel","common/js/nooline/close-section","common/js/nooline/build-timeline","common/js/nooline/attempt-login","common/js/nooline/assign-listeners"],function(){e.componentsLoading.length?e.$document.on("components:complete",o):o()})})});