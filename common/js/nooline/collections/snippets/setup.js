
;(function extendSnippets (N) {
  
  var components = [
    'common/js/nooline/collections/snippets/bind-events'
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