
/**
 * @route login
 * Handles login requests from the client.
 *
 * End point for any user attempting to login.
 *
 * @param req {Object}    Express request object from the client.
 * @param res {Object}    Express response to send back.
 * @return                None.
 */
module.exports = function login (req, res) {
  
  var fs = require('fs');
  var matchLogin = require('../controllers/match-login');
  var errorLogin = require('../controllers/error-login');
  
  var info = {
    req: req,
    res: res,
    username: req.body.username,
    password: req.body.password,
    type: req.body.type
  };
  
  fs.readFile('./sites/' 
    + req.host
    + '/users/'
    + info.username 
    + '.hash', 'utf8', 
    /**
     * reportLoginInfo
     * Reports the login results.
     *
     * Uses a callback, either for error or success, to notify the client.
     *
     * @param error {Object}  Error; couldn't find any such user.
     * @param data  {Object}  Found the user, will attempt to match creds.
     * @return                None.
     */
    function reportLoginInfo (error, data) {
    
    if (error) {
      
      errorLogin(error, info);
      
    } else {
      
      matchLogin(data, info);
      
    }
    
  });
  
};
