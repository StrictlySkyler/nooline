
module.exports = function login (req, res) {
  
  var fs = require('fs');
  var matchLogin = require('../controllers/match-login');
  var errorLogin = require('../controllers/error-login');
  
  var info = {
    'req': req,
    'res': res,
    username: req.body.username,
    password: req.body.password,
    type: req.body.type
  };
  
  fs.readFile('./users/' 
    + info.username 
    + '.hash', 'utf8', 
    function reportLoginInfo (error, data) {
    
    if (error) {
      
      errorLogin(error, info);
      
    } else {
      
      matchLogin(data, info);
      
    }
    
  });
  
};