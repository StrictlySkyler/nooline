
!(function loadComponents (N) {
  
  require([
    'nooline/login-panel',
    'nooline/close-section',
    'nooline/timeline',
    'nooline/scroll',
    'nooline/attempt-login'
  ], function setup() {
    
    require(['nooline/assign-listeners']);
    
    // TODO: This content isn't currently indexable for SEO.  Need to make
    // this a headless snapshot instead. 
    // 
    // TODO: Need to extend this  server-
    // side functionality to include the ability to specify the number of
    // content to get.
    N.getContent({type: 'dates'}, N.buildTimeline);
    
  });
  
}(window.Nooline));