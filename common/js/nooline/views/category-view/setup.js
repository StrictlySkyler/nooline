
define(function () {
  var N = window.Nooline;
    
  var components = [
    'views/category-view/bind-events',
    'views/category-view/create-snippet'
  ];

  N.componentsLoading = N.componentsLoading || [];

  N.componentsLoading = N.componentsLoading.concat(components);

  require([
    'common/js/nooline/views/category-view/bind-events',
    'common/js/nooline/views/category-view/create-snippet'
  ], function () {

    N.componentsLoading = _.difference(N.componentsLoading, components);

    if (!N.componentsLoading.length) {
      N.$document.trigger('components:complete');
    }
  });
  
});