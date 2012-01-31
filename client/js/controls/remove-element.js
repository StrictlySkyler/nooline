(function(N) {
	N.removeElement = function(element) {
				
		if (element) {
			
		var parent = element.parentNode,
			interval = window.setInterval(function() {
				
				var opacity = window.getComputedStyle ?
					window.getComputedStyle(element, null).getPropertyValue('opacity') :
					element.currentStyle.opacity,
					
					height = window.getComputedStyle ?
					window.getComputedStyle(element, null).getPropertyValue('height') :
					element.currentStyle.height;
				
				if (opacity === '0') {
					if (height === '0px') {
						
						parent.removeChild(element);
						window.clearInterval(interval);
					}
				}
			}, 250);
			
		element.style.opacity = 0;
		element.className += ' hidden';
		}
	}
}(Newline));