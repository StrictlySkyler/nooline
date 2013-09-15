
;(function loadBuildTimeline(N) {
  
  N.buildTimeline = function buildTimeline (data) {
    data = JSON.parse(data);
    
    $('#timeline-placeholder').remove();
    
    createStoryJS(data.timeline);
  };
  
}(window.Nooline));