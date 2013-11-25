
define(function () {
  var N = window.Nooline;
    
  var components = [
    'models/category/bind-events',
    'models/category/create-snippet'
  ];

  N.componentsLoading = N.componentsLoading || [];

  N.componentsLoading = N.componentsLoading.concat(components);

  require([
    'common/js/nooline/models/category/bind-events',
    'common/js/nooline/models/category/create-snippet'
  ], function () {

    N.componentsLoading = _.difference(N.componentsLoading, components);

    if (!N.componentsLoading.length) {
      N.$document.trigger('components:complete');
    }
  });

});