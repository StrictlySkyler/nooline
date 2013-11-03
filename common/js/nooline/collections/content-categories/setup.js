
;(function extendContentCategories (N) {
  
  var components = [
    'common/js/nooline/collections/content-categories/bind-events',
    'common/js/nooline/collections/content-categories/find-all-content'
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