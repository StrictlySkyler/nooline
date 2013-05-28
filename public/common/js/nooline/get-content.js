!(function loadGetContent(N) {
  
  N.getContent = function getContent (type, next) {
    $.ajax({
      url: '/content/' + window.location.hostname + '/' + type + '/',
      success: next,
      error: N.errorHandler
    });
  };
  
}(window.Nooline));