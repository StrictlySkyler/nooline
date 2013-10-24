
;(function extendCategoryView (N) {
  
  var components = [
    'nooline/views/category-view/bind-events',
    'nooline/views/category-view/create-snippet'
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