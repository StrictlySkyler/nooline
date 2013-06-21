
!(function start() {
  
  function Nooline () {
    requirejs.config({
      baseUrl: '/',
      paths: {
        bower: '/common/js/bower',
        nooline: '/common/js/nooline',
        shared: '/node_modules'
      },
      shim: {
        'bower/backbone/backbone': {
          deps: ['bower/underscore/underscore', 'bower/jquery/jquery'],
          exports: 'Backbone'
        },
        'underscore': {
          exports: '_'
        },
        'bower/TimelineJS/compiled/js/timeline-min': {
          deps: ['bower/TimelineJS/compiled/js/storyjs-embed']
        },
        'nooline/timeline': {
          deps: [
            'bower/TimelineJS/compiled/js/timeline-min',
            'bower/TimelineJS/compiled/js/storyjs-embed'
          ]
        }
      }
    });
    
    // TODO: Add configuration loading to the list! 
    // Need to handle some of the
    // modules, like Crypto, which export rather than adding to global scope
    // automatically.
    // Perhaps this is the bootstrap?  Also see load-components.js.
    require([
      'bower/jquery/jquery',
      'bower/modernizr/modernizr',
      'bower/underscore/underscore',
      'bower/backbone/backbone',
      'bower/TimelineJS/compiled/js/timeline-min',
      'bower/TimelineJS/compiled/js/storyjs-embed',
      'nooline/get-content',
      'nooline/error-handler',
      'nooline/load-components'
    ]);
  }
  
  window.Nooline = new Nooline();
  
}());