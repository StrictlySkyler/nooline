
define('common/js/nooline/views/content-snippet-view/setup',
  [],
  function () {
  var N = this.Nooline;

  var components = [
    'views/content-snippet-view/bind-events',
    'views/content-snippet-view/set-options',
    'views/content-snippet-view/get-option',
    'views/content-snippet-view/render',
    'views/content-snippet-view/enable-editing',
    'views/content-snippet-view/start-editing',
    'views/content-snippet-view/show-editor',
    'views/content-snippet-view/stop-editing',
    'views/content-snippet-view/hide-editor',
    'views/content-snippet-view/disable-editing',
    'views/content-snippet-view/commit-changes',
    'views/content-snippet-view/save',
    'views/content-snippet-view/create',
    'views/content-snippet-view/wait-for-visibility',
    'views/content-snippet-view/remove',
    'views/content-snippet-view/unpublish-content',
    'views/content-snippet-view/verify'
  ];

  N.componentsLoading = N.componentsLoading.concat(components);

  require([
    'common/js/nooline/views/content-snippet-view/bind-events',
    'common/js/nooline/views/content-snippet-view/set-options',
    'common/js/nooline/views/content-snippet-view/get-option',
    'common/js/nooline/views/content-snippet-view/render',
    'common/js/nooline/views/content-snippet-view/enable-editing',
    'common/js/nooline/views/content-snippet-view/start-editing',
    'common/js/nooline/views/content-snippet-view/show-editor',
    'common/js/nooline/views/content-snippet-view/stop-editing',
    'common/js/nooline/views/content-snippet-view/hide-editor',
    'common/js/nooline/views/content-snippet-view/disable-editing',
    'common/js/nooline/views/content-snippet-view/commit-changes',
    'common/js/nooline/views/content-snippet-view/save',
    'common/js/nooline/views/content-snippet-view/create',
    'common/js/nooline/views/content-snippet-view/wait-for-visibility',
    'common/js/nooline/views/content-snippet-view/remove',
    'common/js/nooline/views/content-snippet-view/unpublish-content',
    'common/js/nooline/views/content-snippet-view/verify',
    'common/js/nooline/views/content-snippet-view/cancel-verify',
    'common/js/nooline/views/content-snippet-view/confirm-verify'
  /**
   * removeLoaded
   * Remove loaded components from the queue.
   *
   * After the various parts of the view have finished loading, yank them
   * from the queue of components still loading.  If there are none left,
   * notify the app that all components have finished.
   *
   * @return  None.
   */
  ], function removeLoaded (foo) {

    N.componentsLoading = _.difference(N.componentsLoading, components);

    if (!N.componentsLoading.length) {
      N.$document.trigger('components:complete');
    }
  });

});
