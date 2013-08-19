
module.exports = function bootstrap (req, res) {

  function checkComplete() {
    if (settings.bootstrap && settings.controls) {
      res.send(settings);
    }
  }
  
  var fs = require('fs');
  var path = './sites/' + req.host + '/config/';
  var bootstrapSettings = path + 'bootstrap.json';
  var controls = path + 'controls.json';
  var settings = {};

  fs.readFile(bootstrapSettings, 'utf8', function loadBoostrap (error, data) {
    if (error) {
      throw error;
    }

    try {
      settings.bootstrap = JSON.parse(data);

      checkComplete();
    } catch (error) {
      throw error;
    }
  });

  fs.readFile(controls, 'utf8', function loadControls (error, data) {
    if (error) {
      throw error;
    }

    try {
      settings.controls = JSON.parse(data);

      checkComplete();
    } catch (error) {
      throw error;
    }

  });
};