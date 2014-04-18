
define(function () {

  var N = window.Nooline;
  var $placeholder;

  /**
   * initializeContent
   * Initialize the content for a page.
   *
   * Sets up the Models and Collections, and gets content relevant to the 
   * page.
   *
   * TODO: This is hardcoded right now.  Need to put it in the config 
   * (probably the bootstrap process).  Also, find a better way to deal with
   * the timeline's placeholder.  This should also be able to make a single
   * request for multiple content types, along with ranges of content.
   * 
   * TODO: Move the setup which happens here to someplace that makes more
   * sense.
   *
   * @return  None.
   */
  function initializeContent () {

    N.contentCategories = new N.Collections.ContentCategories();

    if ($placeholder.length) {
      $('#timeline-placeholder').remove();

      N.getContent({type: 'timeline'}, N.buildTimeline);
    }

    N.getContent({type: 'scroll'});
  }

  window.requestAnimationFrame = window.requestAnimationFrame 
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame;

  $(document.body).attr({
    id: 'nooline'
  });

  N.io = io.connect();

  N.$document = $(document);

  $.get('/bootstrap', function bootstrap (data) {

    $placeholder = $('#timeline-placeholder');

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
    /**
     * setup
     * Setup the content we've loaded.
     *
     * When the components have all finished loading, they'll have removed
     * themselves from the `componentsLoading` queue, and we can init the
     * content.  Otherwise we listen until that happens, and do it then.
     *
     * @return  None.
     */
    ], function setup() {

      if (!N.componentsLoading.length) {

        initializeContent();
      } else {

        N.$document.on('components:complete', initializeContent);
      }
      
    });
    
  });
  
});
