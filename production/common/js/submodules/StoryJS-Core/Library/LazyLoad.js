/*
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
@version 2.0.3 (git)
*/

LazyLoad=function(e){function t(t,s){var n,c=e.createElement(t);for(n in s)s.hasOwnProperty(n)&&c.setAttribute(n,s[n]);return c}function s(e){var t,s,n=i[e];n&&(t=n.callback,s=n.urls,s.shift(),u=0,s.length||(t&&t.call(n.context,n.obj),i[e]=null,f[e].length&&c(e)))}function n(){var t=navigator.userAgent;o={async:e.createElement("script").async===!0},(o.webkit=/AppleWebKit\//.test(t))||(o.ie=/MSIE/.test(t))||(o.opera=/Opera/.test(t))||(o.gecko=/Gecko\//.test(t))||(o.unknown=!0)}function c(c,u,h,g,p){var y,d,k,b,m,v,j=function(){s(c)},w="css"===c,A=[];if(o||n(),u)if(u="string"==typeof u?[u]:u.concat(),w||o.async||o.gecko||o.opera)f[c].push({urls:u,callback:h,obj:g,context:p});else for(y=0,d=u.length;d>y;++y)f[c].push({urls:[u[y]],callback:y===d-1?h:null,obj:g,context:p});if(!i[c]&&(b=i[c]=f[c].shift())){for(l||(l=e.head||e.getElementsByTagName("head")[0]),m=b.urls,y=0,d=m.length;d>y;++y)v=m[y],w?k=o.gecko?t("style"):t("link",{href:v,rel:"stylesheet"}):(k=t("script",{src:v}),k.async=!1),k.className="lazyload",k.setAttribute("charset","utf-8"),o.ie&&!w?k.onreadystatechange=function(){/loaded|complete/.test(k.readyState)&&(k.onreadystatechange=null,j())}:w&&(o.gecko||o.webkit)?o.webkit?(b.urls[y]=k.href,a()):(k.innerHTML='@import "'+v+'";',r(k)):k.onload=k.onerror=j,A.push(k);for(y=0,d=A.length;d>y;++y)l.appendChild(A[y])}}function r(e){var t;try{t=!!e.sheet.cssRules}catch(n){return u+=1,200>u?setTimeout(function(){r(e)},50):t&&s("css"),void 0}s("css")}function a(){var e,t=i.css;if(t){for(e=h.length;--e>=0;)if(h[e].href===t.urls[0]){s("css");break}u+=1,t&&(200>u?setTimeout(a,50):s("css"))}}var o,l,i={},u=0,f={css:[],js:[]},h=e.styleSheets;return{css:function(e,t,s,n){c("css",e,t,s,n)},js:function(e,t,s,n){c("js",e,t,s,n)}}}(this.document);