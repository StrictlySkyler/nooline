
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
        }
      }
    });
    
    requirejs([
      'bower/jquery/jquery',
      'bower/modernizr/modernizr',
      'bower/underscore/underscore',
      'bower/backbone/backbone',
      'bower/TimelineJS/compiled/js/timeline-min',
      'bower/TimelineJS/compiled/js/storyjs-embed',
      'nooline/get-content',
      'nooline/error-handler',
      'nooline/build-timeline',
      'nooline/build-scroll'
    ], function setupContent(){
      
      // TODO: This content isn't currently indexable for SEO.  Need to make
      // this a headless snapshot instead. 
      // 
      // TODO: Need to extend this  server-
      // side functionality to include the ability to specify the number of
      // content to get.
      if ($('#timeline').length) {
        N.getContent({type: 'dates'}, N.buildTimeline);
      }
      
      
    });
  }
  
  var N = root.Nooline = new Nooline();
  
}(window));