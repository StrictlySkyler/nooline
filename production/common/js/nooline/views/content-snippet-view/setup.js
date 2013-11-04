
define("common/js/nooline/views/content-snippet-view/setup", function(){
  ;(function extendContentSnippetView (N) {
    
    var components = [
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
      'common/js/nooline/views/content-snippet-view/remove'
    ];

    N.componentsLoading = N.componentsLoading || [];

    N.componentsLoading = N.componentsLoading.concat(components);

    require(components, function () {

      N.componentsLoading = _.difference(N.componentsLoading, components);

      if (!N.componentsLoading.length) {
        N.$document.trigger('components:complete');
      }
    });
  }(window.Nooline));
});