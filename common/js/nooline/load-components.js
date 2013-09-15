
;(function loadComponents (N) {

  window.requestAnimationFrame = window.requestAnimationFrame 
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame;

  $(document.body).attr({
    id: 'nooline'
  });

  // This should eventually be loading only things specific to this site.
  // Right now it doesn't.
  $.get('/bootstrap', function bootstrap (data) { 

    N.settings = data.bootstrap.settings;
    sessionStorage.settings = JSON.stringify(data.bootstrap.settings);

    N.controls = data.controls;
    localStorage.controls = JSON.stringify(data.controls);

    require(data.bootstrap.files, function setup() {
    
    // TODO: This content isn't currently indexable for SEO.  Need to make this
    // a headless snapshot instead.   
    // 
    // TODO: Need to extend this  server- side functionality to include the
    // ability to specify the number of content items to get, and multiple 
    // types.
    N.getContent({type: 'timeline'}, N.buildTimeline);

    N.getContent({type: 'scroll'});
  });
  
    
  });
  
}(window.Nooline));