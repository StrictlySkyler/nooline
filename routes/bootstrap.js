
/**
 * @route bootstrap
 * Clients hit this route when loading their config files.  Essentially this
 * route loads JSON data, and sends it to the client, nothing more.
 *
 * Could be swapped out to grab config data from some other source, if
 * needed.
 *
 * @param {Object}  req   The Express request object from he client.
 * @param {Object}  res   The Express response object to send back.
 */
module.exports = function bootstrap (req, res) {

  /**
   * Check to see if both settings files have finished loading.  If so, send
   * the settings back to the client.
   */
  function checkComplete() {
    if (settings.bootstrap && settings.controls) {
      res.send(settings);
    }
  }
  
  var fs = require('fs');
  // TODO: Make these overridable defaults.
  var path = './sites/' + req.host + '/config/';
  var bootstrapSettings = path + 'bootstrap.json';
  var controls = path + 'controls.json';
  var settings = {};

  /**
   * Load the client settings, and parse them if we can.
   */
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

  /**
   * Load the client controls, and parse them if we can.
   */
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
