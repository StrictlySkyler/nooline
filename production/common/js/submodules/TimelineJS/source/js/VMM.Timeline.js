"undefined"!=typeof VMM&&void 0===VMM.Timeline&&(VMM.Timeline=function(e,t,a){function i(e){"object"==typeof embed_config&&(timeline_config=embed_config),"object"==typeof timeline_config?(trace("HAS TIMELINE CONFIG"),z=VMM.Util.mergeConfig(z,timeline_config)):"object"==typeof e&&(z=VMM.Util.mergeConfig(z,e)),("mobile"==VMM.Browser.device||"tablet"==VMM.Browser.device)&&(z.touch=!0),z.nav.width=z.width,z.nav.height=200,z.feature.width=z.width,z.feature.height=z.height-z.nav.height,z.nav.zoom.adjust=parseInt(z.start_zoom_adjust,10),VMM.Timeline.Config=z,VMM.master_config.Timeline=VMM.Timeline.Config,this.events=z.events,""!=z.gmap_key&&(z.api_keys.google=z.gmap_key),trace("VERSION "+z.version),S=z.version}function n(){D=VMM.getElement(N),VMM.Lib.addClass(D,"vco-timeline"),VMM.Lib.addClass(D,"vco-storyjs"),y=VMM.appendAndGetElement(D,"<div>","vco-container vco-main"),L=VMM.appendAndGetElement(y,"<div>","vco-feature"),T=VMM.appendAndGetElement(L,"<div>","vco-slider"),A=VMM.appendAndGetElement(y,"<div>","vco-navigation"),I=VMM.appendAndGetElement(D,"<div>","vco-feedback",""),void 0!==z.language.right_to_left&&VMM.Lib.addClass(D,"vco-right-to-left"),k=new VMM.Slider(T,z),x=new VMM.Timeline.TimeNav(A),G?VMM.Lib.width(D,z.width):z.width=VMM.Lib.width(D),H?VMM.Lib.height(D,z.height):z.height=VMM.Lib.height(D),z.touch?VMM.Lib.addClass(D,"vco-touch"):VMM.Lib.addClass(D,"vco-notouch")}function s(e,t){trace("onDataReady"),j=t.timeline,"array"!=type.of(j.era)&&(j.era=[]),E()}function r(){_()}function d(){b(),k.setSize(z.feature.width,z.feature.height),x.setSize(z.width,z.height),f()&&m()}function o(){z.loaded.slider=!0,l()}function l(){z.loaded.percentloaded=z.loaded.percentloaded+25,z.loaded.slider&&z.loaded.timenav&&V()}function M(){z.loaded.timenav=!0,l()}function u(){P=!0,z.current_slide=k.getCurrentNumber(),c(z.current_slide),x.setMarker(z.current_slide,z.ease,z.duration)}function g(){P=!0,z.current_slide=x.getCurrentNumber(),c(z.current_slide),k.setSlide(z.current_slide)}function h(e){e<=B.length-1&&e>=0&&(z.current_slide=e,k.setSlide(z.current_slide),x.setMarker(z.current_slide,z.ease,z.duration))}function c(e){z.hash_bookmark&&(window.location.hash="#"+(""+e))}function m(){var e="",t=v(window.orientation);"mobile"==VMM.Browser.device?e="portrait"==t?"width=device-width; initial-scale=0.5, maximum-scale=0.5":"landscape"==t?"width=device-width; initial-scale=0.5, maximum-scale=0.5":"width=device-width, initial-scale=1, maximum-scale=1.0":"tablet"==VMM.Browser.device,document.getElementById("viewport")}function v(e){var t="";return t=0==e||180==e?"portrait":90==e||-90==e?"landscape":"normal"}function f(){var e=v(window.orientation);return e==z.orientation?!1:(z.orientation=e,!0)}function p(e,t,a){trace("showMessege "+t),a?VMM.attachElement(I,t):VMM.attachElement(I,VMM.MediaElement.loadingmessage(t))}function V(){VMM.Lib.animate(I,z.duration,4*z.ease,{opacity:0},w)}function w(){VMM.Lib.detach(I)}function _(){parseInt(z.start_at_slide)>0&&0==z.current_slide&&(z.current_slide=parseInt(z.start_at_slide)),z.start_at_end&&0==z.current_slide&&(z.current_slide=B.length-1),O?(O=!0,VMM.fireEvent(global,z.events.messege,"Internet Explorer "+VMM.Browser.version+" is not supported by TimelineJS. Please update your browser to version 8 or higher.")):(w(),d(),VMM.bindEvent(T,o,"LOADED"),VMM.bindEvent(A,M,"LOADED"),VMM.bindEvent(T,u,"UPDATE"),VMM.bindEvent(A,g,"UPDATE"),k.init(B),x.init(B,j.era),VMM.bindEvent(global,d,z.events.resize))}function b(){trace("UPDATE SIZE"),z.width=VMM.Lib.width(D),z.height=VMM.Lib.height(D),z.nav.width=z.width,z.feature.width=z.width,z.feature.height=z.height-z.nav.height-3,"mobile"==VMM.Browser.device,z.width<641?VMM.Lib.addClass(D,"vco-skinny"):VMM.Lib.removeClass(D,"vco-skinny")}function E(){var e,t,a,i,n;for(B=[],VMM.fireEvent(global,z.events.messege,"Building Dates"),b(),e=0;e<j.date.length;e++)null!=j.date[e].startDate&&""!=j.date[e].startDate&&(t={},a=VMM.Date.parse(j.date[e].startDate,!0),t.startdate=a.date,t.precisiondate=a.precision,isNaN(t.startdate)||(t.enddate=null!=j.date[e].endDate&&""!=j.date[e].endDate?VMM.Date.parse(j.date[e].endDate):t.startdate,t.needs_slug=!1,""==j.date[e].headline&&null!=j.date[e].slug&&""!=j.date[e].slug&&(t.needs_slug=!0),t.title=j.date[e].headline,t.headline=j.date[e].headline,t.type=j.date[e].type,t.date=VMM.Date.prettyDate(t.startdate,!1,t.precisiondate),t.asset=j.date[e].asset,t.fulldate=t.startdate.getTime(),t.text=j.date[e].text,t.content="",t.tag=j.date[e].tag,t.slug=j.date[e].slug,t.uniqueid=j.date[e].uuid||VMM.Util.unique_ID(7),t.classname=j.date[e].classname,B.push(t)));"storify"!=j.type&&B.sort(function(e,t){return e.fulldate-t.fulldate}),null!=j.headline&&""!=j.headline&&null!=j.text&&""!=j.text&&(t={},void 0!==j.startDate?(a=VMM.Date.parse(j.startDate,!0),i=a.date):i=!1,trace("HAS STARTPAGE"),trace(i),i&&i<B[0].startdate?t.startdate=new Date(i):(n=B[0].startdate,t.startdate=new Date(B[0].startdate),0===n.getMonth()&&1==n.getDate()&&0===n.getHours()&&0===n.getMinutes()?t.startdate.setFullYear(n.getFullYear()-1):n.getDate()<=1&&0===n.getHours()&&0===n.getMinutes()?t.startdate.setMonth(n.getMonth()-1):0===n.getHours()&&0===n.getMinutes()?t.startdate.setDate(n.getDate()-1):0===n.getMinutes()?t.startdate.setHours(n.getHours()-1):t.startdate.setMinutes(n.getMinutes()-1)),t.uniqueid=j.date[e]?j.date[e].uuid:VMM.Util.unique_ID(7),t.enddate=t.startdate,t.precisiondate=a.precision,t.title=j.headline,t.headline=j.headline,t.text=j.text,t.type="start",t.date=VMM.Date.prettyDate(j.startDate,!1,t.precisiondate),t.asset=j.asset,t.slug=!1,t.needs_slug=!1,t.fulldate=t.startdate.getTime(),z.embed&&VMM.fireEvent(global,z.events.headline,t.headline),B.unshift(t)),"storify"!=j.type&&B.sort(function(e,t){return e.fulldate-t.fulldate}),r()}var D,y,L,I,T,A,k,x,C,S="2.x",N="#timelinejs",j={},B=[],z={},G=!1,H=!1,O=!1,P=!1;N="string"==type.of(e)?e.match("#")?e:"#"+e:"#timelinejs",z={embed:!1,events:{data_ready:"DATAREADY",messege:"MESSEGE",headline:"HEADLINE",slide_change:"SLIDE_CHANGE",resize:"resize"},id:N,source:"nothing",type:"timeline",touch:!1,orientation:"normal",maptype:"toner",version:"2.x",preload:4,current_slide:0,hash_bookmark:!1,start_at_end:!1,start_at_slide:0,start_zoom_adjust:0,start_page:!1,api_keys:{google:"",flickr:"",twitter:""},interval:10,something:0,width:960,height:540,spacing:15,loaded:{slider:!1,timenav:!1,percentloaded:0},nav:{start_page:!1,interval_width:200,density:4,minor_width:0,minor_left:0,constraint:{left:0,right:0,right_min:0,right_max:0},zoom:{adjust:0},multiplier:{current:6,min:.1,max:50},rows:[1,1,1],width:960,height:200,marker:{width:150,height:50}},feature:{width:960,height:540},slider:{width:720,height:400,content:{width:720,height:400,padding:130,padding_default:130},nav:{width:100,height:200}},ease:"easeInOutExpo",duration:1e3,gmap_key:"",language:VMM.Language},null!=t&&""!=t&&(z.width=t,G=!0),null!=a&&""!=a&&(z.height=a,H=!0),window.location.hash&&(C=window.location.hash.substring(1),isNaN(C)||(z.current_slide=parseInt(C))),window.onhashchange=function(){var e=window.location.hash.substring(1);z.hash_bookmark?P?h(parseInt(e)):P=!1:h(parseInt(e))},this.init=function(e,t){trace("INIT"),m(),i(e),n(),"string"==type.of(t)&&(z.source=t),VMM.Date.setLanguage(z.language),VMM.master_config.language=z.language,VMM.ExternalAPI.setKeys(z.api_keys),VMM.ExternalAPI.googlemaps.setMapType(z.maptype),VMM.bindEvent(global,s,z.events.data_ready),VMM.bindEvent(global,p,z.events.messege),VMM.fireEvent(global,z.events.messege,z.language.messages.loading_timeline),("Explorer"==VMM.Browser.browser||"MSIE"==VMM.Browser.browser)&&parseInt(VMM.Browser.version,10)<=7&&(O=!0),"string"==type.of(z.source)||"object"==type.of(z.source)?VMM.Timeline.DataObj.getData(z.source):VMM.fireEvent(global,z.events.messege,"No data source provided")},this.iframeLoaded=function(){trace("iframeLoaded")},this.reload=function(e){trace("Load new timeline data"+e),VMM.fireEvent(global,z.events.messege,z.language.messages.loading_timeline),j={},VMM.Timeline.DataObj.getData(e),z.current_slide=0,k.setSlide(0),x.setMarker(0,z.ease,z.duration)}},VMM.Timeline.Config={});