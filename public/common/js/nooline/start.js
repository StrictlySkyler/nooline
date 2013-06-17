
!(function start(root) {
  
  function Nooline () {
    requirejs.config({
      baseUrl: '/',
      paths: {
        bower: '/common/js/bower',
        nooline: '/common/js/nooline'
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
  
  root.Nooline = new Nooline();
  
}(window));