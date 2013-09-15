
;(function start() {
  
  function Nooline () {
    requirejs.config({
      baseUrl: '/',
      paths: {
        bower: '/common/js/bower',
        nooline: '/common/js/nooline',
        sharedlibs: '/node_modules',
        submodules: '/common/js/submodules'
      },
      shim: {
        'sharedlibs/node-uuid/uuid': {
          exports: 'uuid'
        },
        'sharedlibs/backbone/backbone': {
          deps: [
            'sharedlibs/underscore/underscore',
            'bower/jquery/jquery'
          ]
        },
        'submodules/StoryJS-Core/VMM.StoryJS': {
          deps: [
            'submodules/StoryJS-Core/Core/VMM.Browser',
            'submodules/StoryJS-Core/Core/VMM.Core',
            'submodules/StoryJS-Core/Core/VMM.Date',
            'submodules/StoryJS-Core/Core/VMM.FileExtention',
            'submodules/StoryJS-Core/Core/VMM',
            'submodules/StoryJS-Core/Core/VMM.Library',
            'submodules/StoryJS-Core/Core/VMM.LoadLib',
            'submodules/StoryJS-Core/Core/VMM.Util',
            'submodules/StoryJS-Core/Embed/Embed',
            'submodules/StoryJS-Core/Embed/Embed.LoadLib',
            'submodules/TimelineJS/compiled/js/timeline',
            'submodules/StoryJS-Core/Library/LazyLoad'
          ]
        },
        'nooline/build-timeline': {
          deps: [
            'submodules/StoryJS-Core/VMM.StoryJS',
          ]
        },
        'nooline/load-components': {
          deps: [
          // Right now, jQuery in Bower and npm aren't the same version.
          // Bower ~= 2.0.x
          // npm ~= 1.8.x
          // Eventually, when these versions reach parity, the same source
          // should be used for both client and server.
          // 2013-09-13
            'bower/jquery/jquery',
            'sharedlibs/socket.io-client/dist/socket.io'
          ]
        },
        'nooline/get-content': {
          deps: [
            'sharedlibs/backbone/backbone'
          ]
        }
      }
    });
    
    // Also see load-components.js.
    require([
      'bower/jquery/jquery',
      'bower/modernizr/modernizr',
      'submodules/StoryJS-Core/VMM.StoryJS',
      'sharedlibs/underscore/underscore',
      'sharedlibs/backbone/backbone',
      'nooline/get-content',
      'nooline/error-handler',
      'nooline/load-components'
    ]);

    // For those modules which explicitly require definition via AMD.
    // A CJS loader for browser, without needing to compile, would be so nice.
    define([
      'sharedlibs/node-uuid/uuid'
    ], function (uuid) {
      window.uuid = uuid;
    });
  }
  
  window.Nooline = new Nooline();
  
}());