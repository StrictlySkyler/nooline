
define(function () {
  var N = window.Nooline;
    
  N.validate = function validate (strings) {
    
    var rules = {
      username: function (string) {
        if ((string.length > 2) 
          && (/^[\w\d\s]+$/.test(string))) {
          return true;
        }
      },
      
      password: function (string) {
        if ((string.length > 12)
          && (/^[\w\d\s!@#$%^&*?<>]+$/.test(string))) {
          return true;
        }
      }
    };
    
    var valid = _.every(strings, function checkRules (string, test) {
      
      if (rules[test]) {
        
        return rules[test](string);
        
      } else {
        
        return false;
        
      }
    });
    
    return valid;
    
  };
  
});