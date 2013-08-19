
module.exports = function errorLogin (error, info) {
  
  var data = {
    status: error.code
  };
  
  info.res.send(data);
  
};