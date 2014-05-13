
/**
 * matchLogin
 * Matches the users creds, and responds.
 *
 * If the username exists, this function will be called to match the password
 * hashes.  This will also determine if the user expiry time has elapsed, and
 * respond accordingly, potentially making the user login again.
 *
 * @param data  {String}  JSON containing the user creds from the user file.
 * @param info  {Object}  Contains the user password submitted by the client.
 * @return                None.
 */
module.exports = function matchLogin (data, info) {
  
  var errorLogin = require('./error-login');
  var crypto = require('crypto-js/core');
  var startSession = require('./start-session');
  var EXPIRY = info.req.app.settings.EXPIRY;
  
  // Extends crypto, no need to store as a variable.
  require('crypto-js/pbkdf2');
  
  var options = {
    keySize: 16
  };
  var results;
  var error;
  var timeLapsed;
  var serverHash;
  var clientHash;
  
  try {
    data = JSON.parse(data);
  } catch (error) {
    errorLogin(error, info);
  }
  
  timeLapsed = Date.now() - data.timestamp;

  if (info.type === 'initial'
      || (info.type === 'update' && timeLapsed < EXPIRY)) {
  
    serverHash = crypto.PBKDF2(
      data.password, 
      data.salt, 
      options
    ).toString();
    
    clientHash = crypto.PBKDF2(
      info.password, 
      data.salt, 
      options
    ).toString();
    
    if (serverHash === clientHash) {
      results = {
        status: 'success',
        username: info.username,
        permissions: data.permissions
      };
      
      info.res.send(results);
      
      startSession(data, info);
      
    } else {
      error = {
        code: 'mismatch'
      };
      
      errorLogin(error, info);
      
    }
  // TODO:
  // Need to add check to verify if the user manually submitted the info or not
  } else {
    
    error = {
      code: 'expiry'
    };
    
    startSession(data, info);
    
    errorLogin(error, info);
    
  }
  
  
};
