define('common/js/nooline/validate',
  ['common/js/nooline/load-components'],
  function () {

  var N = this.Nooline;

  /**
   * validate
   * Make sure input is correct.
   *
   * Validates that the username and password strings are formed properly,
   * and meet the security requirements.
   *
   * @param strings {Object}  Contains the user's creds.
   * @return        {Boolean} Whether vaidation passes or not.
   */
  N.validate = function validate (strings) {

    var rules = {
      /**
       * username
       * Checks for a minimum of 2 chars, alphanumeric and whitespace only.
       *
       * @param string  {String}  The string to match.
       * @return        {Boolean} True if string passes, or undefined.
       */
      username: function (string) {
        if ((string.length > 2)
          && (/^[\w\d\s]+$/.test(string))) {
          return true;
        }
      },

      /**
       * password
       * Minimum of 12 chars, alphanumeric + symbols and spaces.
       *
       * @param string  {String}  String to match.
       * @return        {Boolean} True if string passes, or undefined.
       */
      password: function (string) {
        if ((string.length > 12)
          && (/^[\w\d\s!@#$%^&*?<>]+$/.test(string))) {
          return true;
        }
      }
    };

    /**
     * checkRules
     * Checks the rules against every matching type of validation test.
     *
     * @param string  {String}  The string value in the creds object.
     * @param test    {String}  The key for the string value in the object.
     * @return        {Boolean} True if all strings pass, otherwise false.
     */
    var valid = _.every(strings, function checkRules (string, test) {

      if (rules[test]) {

        return rules[test](string);

      } else {

        return false;

      }
    });

    return valid;

  };

  return N.validate;

});
