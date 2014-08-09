define('common/js/nooline/load-components',
  [
    'node_modules/jquery/dist/jquery',
    'common/js/nooline/get-content',
    'common/js/nooline/collections/content-categories',
    'common/js/nooline/collections/snippets',
    'common/js/nooline/models/category',
    'common/js/nooline/models/content-snippet',
    'common/js/nooline/views/category-view',
    'common/js/nooline/views/content-snippet-view'
  ],
  function () {

  var N = this.Nooline;

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

    N.getContent({type: 'scroll'});

    autoLogin();
  }

  function autoLogin () {
    var lastLoginAttempt;
    var timediff;

    if (sessionStorage.lastLoginAttempt) {
      lastLoginAttempt = JSON.parse(sessionStorage.lastLoginAttempt);
      timediff = Date.now() - lastLoginAttempt.timestamp;
    }

    if (timediff < N.settings.EXPIRY) {

      N.postLogin(
        lastLoginAttempt.username,
        lastLoginAttempt.password,
        'initial'
      );
    }
  }

  window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame;

  $(document.body).attr({
    id: 'nooline'
  });

  N.$document = $(document);

  $.get('/bootstrap', function bootstrap (data) {

    N.settings = data.bootstrap.settings;
    sessionStorage.settings = JSON.stringify(data.bootstrap.settings);

    N.controls = data.controls;
    localStorage.controls = JSON.stringify(data.controls);

    N.$document.on('components:complete', initializeContent);

  });

  return true;

});
