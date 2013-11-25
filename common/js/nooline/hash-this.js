
define(function () {
  var N = window.Nooline;
    
  N.hashThis = function hashThis (string) {
    
    var hash = Crypto.SHA3(string);
    
    var encoded = hash.toString(Crypto.enc.Base64);
    
    return encoded;
    
  };
  
});