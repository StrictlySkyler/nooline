
;(function extendContentSnippetView (N) {
  
  var components = [
    'nooline/views/content-snippet-view/bind-events',
    'nooline/views/content-snippet-view/set-options',
    'nooline/views/content-snippet-view/get-option',
    'nooline/views/content-snippet-view/render',
    'nooline/views/content-snippet-view/enable-editing',
    'nooline/views/content-snippet-view/start-editing',
    'nooline/views/content-snippet-view/show-editor',
    'nooline/views/content-snippet-view/stop-editing',
    'nooline/views/content-snippet-view/hide-editor',
    'nooline/views/content-snippet-view/disable-editing',
    'nooline/views/content-snippet-view/commit-changes',
    'nooline/views/content-snippet-view/save'
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