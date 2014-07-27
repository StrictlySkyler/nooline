
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
        'node_modules/backbone/backbone': {
          deps: [
            'node_modules/underscore/underscore',
            'common/js/bower/jquery/jquery'
          ],
          exports: 'Backbone'
        },
        'node_modules/underscore/underscore': {
          exports: '_'
        },
        'node_modules/moment/moment': {
          exports: 'moment'
        }
      }
    });

    requirejs([
      'node_modules/node-uuid/uuid',
      'node_modules/moment/moment',
      'node_modules/jquery/dist/jquery',
      'node_modules/underscore/underscore',
      'node_modules/backbone/backbone',
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
  }

  window.Nooline = new Nooline();
  window.Nooline.componentsLoading = [];

}());
