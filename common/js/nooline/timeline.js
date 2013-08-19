;(function loadBuildTimeline(N) {
  
  N.buildTimeline = function buildTimeline (data) {
    data = JSON.parse(data);
    
    createStoryJS(data);
  };
  
}(window.Nooline));