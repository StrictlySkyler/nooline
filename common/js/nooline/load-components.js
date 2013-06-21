
!(function loadComponents (root) {
  
  var N = root.Nooline;
  
  // This list should probably be built during the start.js require phase
  // (loaded from JSON or somesuch), and then loaded here.
  require([
    'nooline/login-panel',
    'nooline/close-section',
    'nooline/timeline',
    'nooline/scroll',
    'nooline/attempt-login',
    'nooline/assign-listeners'
  ], function setup() {
    
    // TODO: This content isn't currently indexable for SEO.  Need to make
    // this a headless snapshot instead. 
    // 
    // TODO: Need to extend this  server-
    // side functionality to include the ability to specify the number of
    // content to get.
    N.getContent({type: 'dates'}, N.buildTimeline);
    
    N.allowSignup = true;
    
  });
  
}(window));