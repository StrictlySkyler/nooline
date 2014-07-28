define('common/js/nooline/error-handler',
  ['common/js/nooline/load-components'],
  function () {

  var N = window.Nooline;

  /**
   * errorHandler
   * Handle errors for Nooline.
   *
   * Custom error handling goes here, such as determining a user-friendly
   * message to display.
   *
   * @param error
   * @return
   */
  N.errorHandler = function errorHandler (error) {
    console.error(error);
  };

});
