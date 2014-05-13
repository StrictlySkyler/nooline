
/**
 * errorLogin
 * For whatever reason, the login failed.  Notify the client.
 *
 * @param error {Object}  Error object; some kind of creds mismatch.
 * @param info  {Object}  Stores a reference to the Express response object.
 * @return                None.
 */
module.exports = function errorLogin (error, info) {
  
  var data = {
    status: error.code
  };
  
  info.res.send(data);
  
};
