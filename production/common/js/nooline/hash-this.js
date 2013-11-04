
define("common/js/nooline/hash-this", function(){
  ;(function buildHashThis (N) {
    
    N.hashThis = function hashThis (string) {
      
      var hash = Crypto.SHA3(string);
      
      var encoded = hash.toString(Crypto.enc.Base64);
      
      return encoded;
      
    };
    
  }(window.Nooline));
});