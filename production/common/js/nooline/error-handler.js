
define("common/js/nooline/error-handler", function(){
  ;(function buildErrorHandler(N) {
    
    N.errorHandler = function errorHandler (error) {
      console.error(error);
    };
    
  }(window.Nooline));
});