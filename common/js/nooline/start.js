
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
        },
        'common/js/submodules/StoryJS-Core/VMM.StoryJS': {
          deps: [
            'common/js/submodules/StoryJS-Core/Core/VMM.Browser',
            'common/js/submodules/StoryJS-Core/Core/VMM.Core',
            'common/js/submodules/StoryJS-Core/Core/VMM.Date',
            'common/js/submodules/StoryJS-Core/Core/VMM.FileExtention',
            'common/js/submodules/StoryJS-Core/Core/VMM',
            'common/js/submodules/StoryJS-Core/Core/VMM.Library',
            'common/js/submodules/StoryJS-Core/Core/VMM.LoadLib',
            'common/js/submodules/StoryJS-Core/Core/VMM.Util',
            'common/js/submodules/StoryJS-Core/Embed/Embed',
            'common/js/submodules/StoryJS-Core/Embed/Embed.LoadLib',
            'common/js/submodules/TimelineJS/compiled/js/timeline',
            'common/js/submodules/StoryJS-Core/Library/LazyLoad'
          ]
        },
        'common/js/nooline/build-timeline': {
          deps: [
            'common/js/submodules/StoryJS-Core/VMM.StoryJS',
          ]
        },
        'common/js/nooline/load-components': {
          deps: [
            'node_modules/jquery/dist/jquery',
            'common/js/nooline/get-content'
          ]
        },
        'common/js/nooline/get-content': {
          deps: [
            'node_modules/backbone/backbone'
          ]
        },
        'common/js/nooline/models/content-snippet': {
          deps: [
            'node_modules/node-uuid/uuid'
          ]
        }
      }
    });

    // Also see load-components.js.
    require([
      'node_modules/jquery/dist/jquery',
      'common/js/bower/modernizr/modernizr',
      'common/js/submodules/StoryJS-Core/VMM.StoryJS',
      'common/js/nooline/get-content',
      'common/js/nooline/error-handler',
      'common/js/nooline/load-components',
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

}());
