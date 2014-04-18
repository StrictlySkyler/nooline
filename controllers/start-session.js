
/**
 * startSession
 * Logs the start of a user session.
 *
 * When a user's credentials match with a successful login, the timestamp is
 * recorded for checking against a timeout.
 *
 * @param data  {Object}  The user credentials loaded from file.
 * @param info  {Object}  Context object containing references we need.
 * @return
 */
module.exports = function startSession (data, info) {
  
  var fs = require('fs');
  var state;
  
  data.timestamp = Date.now();
  
  try {
    state = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error(error);
  }
  
  fs.writeFile('./sites/' 
    + info.req.host
    + '/users/'
    + data.username 
    + '.hash', state,
    /**
     * logTimestamp
     * Log the new timestamp out to file.
     *
     * @param error {Object}  Permissions?  File vanished while you blinked?
     * @return                None.
     */
    function logTimestamp (error) {
    
    if (error) {
      console.error(error);
    } else {
      // Might need to cache this for quick reference down the road.
      console.log('User "' 
        + data.username 
        + '" timestamped at ' 
        + data.timestamp);
    }
    
  });
  
};
