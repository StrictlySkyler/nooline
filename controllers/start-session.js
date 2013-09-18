
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