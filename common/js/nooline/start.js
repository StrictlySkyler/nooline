
/**
 * start
 * Kick the whole thing off.
 *
 * This is the entry point for the client side.
 *
 * @return
 */
;(function start() {

  /**
   * @constructor Nooline
   * The base constructor which we decorate with various modules, governing
   * the namespace for the app.
   *
   * @return  None.
   */
  function Nooline () {
    requirejs.config({
      baseUrl: '/',
      shim: {
        'node_modules/node-uuid/uuid': {
          exports: 'uuid'
        },
        'node_modules/backbone/backbone': {
          deps: [
            'node_modules/underscore/underscore',
            'common/js/bower/jquery/jquery'
          ],
          exports: 'Backbone'
        },
        'node_modules/underscore/underscore': {
          exports: '_'
        }
      }
    });

    require([
      'node_modules/jquery/dist/jquery',
      'common/js/bower/modernizr/modernizr',
      'common/js/nooline/load-components',
      'common/js/nooline/get-content',
      'common/js/nooline/collections/content-categories',
      'common/js/nooline/collections/snippets',
      'common/js/nooline/models/category',
      'common/js/nooline/models/content-snippet',
      'common/js/nooline/views/category-view',
      'common/js/nooline/views/content-snippet-view',
      'common/js/nooline/error-handler',
      'common/js/nooline/show-login-panel',
      'common/js/nooline/close-section',
      'common/js/nooline/attempt-login',
      'common/js/nooline/assign-listeners',
      'common/js/nooline/validate',
      'common/js/nooline/reject-login',
      'common/js/nooline/post-login',
      'common/js/nooline/receive-login'
    ]);

    // For those modules which explicitly require definition via AMD.
    // Some of these, such as moment, need to be required to be initialized.
    // Others don't add themselves to global scope, and we need some of them
    // to do so, such as uuid.
    //
    // A CJS loader for browser, without needing to compile, would be so nice.
    define([
      'node_modules/node-uuid/uuid',
      'node_modules/moment/moment',
      'node_modules/underscore/underscore',
      'node_modules/backbone/backbone'
    /**
     * massage
     * Massage whatever library vars we need to in order to get them working
     * in proper scope.
     *
     * @param uuid  {Object}  The uuid library, to decorate the window.
     * @return                None.
     */
    ], function massage (uuid) {

      require([
        'moment'
      ]);

      window.uuid = uuid;
    });
  }

  window.Nooline = new Nooline();
  window.Nooline.componentsLoading = [];

}());
