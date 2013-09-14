
;(function start() {
  
  function Nooline () {
    requirejs.config({
      baseUrl: '/',
      paths: {
        bower: '/common/js/bower',
        nooline: '/common/js/nooline',
        shared: '/node_modules',
        submodules: '/common/js/submodules'
      },
      shim: {
        'shared/node-uuid/uuid': {
          exports: 'uuid'
        },
        'shared/backbone/backbone': {
          deps: [
            'shared/underscore/underscore',
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
            'bower/jquery/jquery'
          ]
        },
        'nooline/get-content': {
          deps: [
            'shared/backbone/backbone'
          ]
        }
      }
    });
    
    // Also see load-components.js.
    require([
      'bower/jquery/jquery',
      'bower/modernizr/modernizr',
      'submodules/StoryJS-Core/VMM.StoryJS',
      'shared/underscore/underscore',
      'shared/backbone/backbone',
      'nooline/get-content',
      'nooline/error-handler',
      'nooline/load-components'
    ]);

    // For those modules which explicitly require definition via AMD.
    // A CJS loader for browser, without compile, would be so nice.
    define([
      'shared/node-uuid/uuid'
    ], function (uuid) {
      window.uuid = uuid;
    });
  }
  
  window.Nooline = new Nooline();
  
}());