
;(function extendCategory (N) {
  
  var components = [
    'common/js/nooline/models/category/bind-events',
    'common/js/nooline/models/category/create-snippet'
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