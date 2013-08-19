
;(function loadGetContent(N) {

  N.getContent = function getContent (type, next) {
    
    $.get('/content', type, next);
  };
  
}(window.Nooline));