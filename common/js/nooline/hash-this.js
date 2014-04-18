
define(function () {
  var N = window.Nooline;
    
  /**
   * hashThis
   * Hash a string.
   *
   * First hashes with SHA3 at 512 bits, and then Base64 encodes the string.
   *
   * @param string  {String}  The string to encode.
   * @return        {String}  The hashed, encoded string.
   */
  N.hashThis = function hashThis (string) {
    
    var hash = Crypto.SHA3(string);
    
    var encoded = hash.toString(Crypto.enc.Base64);
    
    return encoded;
    
  };
  
});
