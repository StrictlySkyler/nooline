
;(function loadComponents (N) {

  window.requestAnimationFrame = window.requestAnimationFrame 
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame;

  $(document.body).attr({
    id: 'nooline'
  });

  N.io = io.connect();

  N.$document = $(document);

  // This should eventually be loading only things specific to this site.
  // Right now it doesn't.
  $.get('/bootstrap', function bootstrap (data) {

    var $placeholder = $('#timeline-placeholder');

    N.settings = data.bootstrap.settings;
    sessionStorage.settings = JSON.stringify(data.bootstrap.settings);

    N.controls = data.controls;
    localStorage.controls = JSON.stringify(data.controls);

    require([
      'common/js/nooline/show-login-panel',
      'common/js/nooline/close-section',
      'common/js/nooline/build-timeline',
      'common/js/nooline/attempt-login',
      'common/js/nooline/assign-listeners'
    ], function setup() {
    
    // TODO: Need to extend this  server- side functionality to include the
    // ability to specify the number of content items to get, and multiple 
    // types.
    
    N.$document.on('components:complete', function initializeContent () {

      N.contentCategories = new N.Collections.ContentCategories();

      if ($placeholder.length) {
        $('#timeline-placeholder').remove();

        N.getContent({type: 'timeline'}, N.buildTimeline);
      }

      N.getContent({type: 'scroll'});
    });
    
  });
  
    
  });
  
}(window.Nooline));