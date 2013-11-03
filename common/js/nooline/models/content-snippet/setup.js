
;(function extendContentSnippet (N) {
  
  var components = [
    'common/js/nooline/models/content-snippet/bind-events',
    'common/js/nooline/models/content-snippet/enable-editing',
    'common/js/nooline/models/content-snippet/disable-editing',
    'common/js/nooline/models/content-snippet/create',
    'common/js/nooline/models/content-snippet/remove'
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