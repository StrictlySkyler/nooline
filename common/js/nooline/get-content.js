!(function loadGetContent(N) {

  N.getContent = function getContent (type, next) {
    
    $.ajax({
      url: '/content',
      data: type,
      success: next,
      error: N.errorHandler
    });
  };
  
}(window.Nooline));