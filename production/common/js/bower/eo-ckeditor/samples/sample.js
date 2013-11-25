/**
 * Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

!function(){CKEDITOR.on("instanceReady",function(e){var n,t,i=e.editor,o=CKEDITOR.document.$.getElementsByName("ckeditor-sample-required-plugins"),l=o.length?CKEDITOR.dom.element.get(o[0]).getAttribute("content").split(","):[],r=[];if(l.length){for(n=0;n<l.length;n++)i.plugins[l[n]]||r.push("<code>"+l[n]+"</code>");r.length&&(t=CKEDITOR.dom.element.createFromHtml('<div class="warning"><span>To fully experience this demo, the '+r.join(", ")+" plugin"+(r.length>1?"s are":" is")+" required.</span>"+"</div>"),t.insertBefore(i.container))}})}();