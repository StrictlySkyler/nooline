
;(function start() {
  
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
          // Right now, jQuery in Bower and npm aren't the same version.
          // Bower ~= 2.0.x
          // npm ~= 1.8.x
          // Eventually, when these versions reach parity, the same source
          // should be used for both client and server.
          // 2013-09-13
            'common/js/bower/jquery/jquery',
            'node_modules/socket.io-client/dist/socket.io',
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
      'common/js/bower/jquery/jquery',
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
    ], function (uuid) {
      
      require([
        'moment'
      ]);

      window.uuid = uuid;
    });
  }
  
  window.Nooline = new Nooline();
  
}());