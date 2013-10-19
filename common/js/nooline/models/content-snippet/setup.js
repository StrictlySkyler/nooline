
;(function extendContentSnippet (N) {
  
  var components = [
    'nooline/models/content-snippet/bind-events',
    'nooline/models/content-snippet/enable-editing',
    'nooline/models/content-snippet/disable-editing'
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