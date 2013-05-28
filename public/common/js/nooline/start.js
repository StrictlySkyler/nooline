!(function start(root) {
  
  function Nooline () {
    requirejs.config({
      baseUrl: '/',
      paths: {
        bower: '/common/js/bower',
        nooline: '/common/js/nooline'
      },
      shim: {
        'common/backbone/backbone': {
          deps: ['common/underscore/underscore', 'common/jquery/jquery'],
          exports: 'Backbone'
        },
        'underscore': {
          exports: '_'
        },
        '/common/js/timelinejs/compiled/js/timeline-min.js': {
          deps: ['/common/js/timelinejs/compiled/js/storyjs-embed.js']
        }
      }
    });
    
    requirejs([
      'bower/jquery/jquery',
      'bower/modernizr/modernizr',
      'bower/underscore/underscore',
      'bower/backbone/backbone',
      '/common/js/timelinejs/compiled/js/timeline-min.js',
      '/common/js/timelinejs/compiled/js/storyjs-embed.js',
      'nooline/get-content',
      'nooline/error-handler',
      'nooline/build-timeline'
    ], function setupContent(){
      
      N.getContent('timeline', N.buildTimeline);
      
    });
  }
  
  var N = root.Nooline = new Nooline();
  
}(window));