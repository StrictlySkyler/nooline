!function(){function n(i){var n=i.split("?"),e=parseInt(n[0],10),c=n[1].split(":"),o=c[e];return{index:e,choices:c,choice:o}}define({normalize:function(e,c){var o=n(e),t=o.choices;for(i=0;i<t.length;i++)t[i]=c(t[i]);return o.index+"?"+t.join(":")},load:function(i,e,c){e([n(i).choice],function(i){c(i)})},write:function(i,e,c){var o=n(e);c("define('"+i+"!"+e+"', ['"+o.choice+"'], function (value) { return value;});\n")}})}();