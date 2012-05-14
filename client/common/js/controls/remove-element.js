// Removes an element passed to it from the DOM. Usually called from a close
// button on a form.

(function(N) {
	N.removeElement = function(element) {
		
		// Recursive loop checks to see if the element still exists on the page or
		// if it's been removed.
		if (element) {
			
			// Grab the parent element, and set an interval to check on the opacity
			// and height (the "hidden" class uses height) of the element, waiting to
			// remove the element until both have reached 0.
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
			element.style.minHeight = 0;
			element.className += ' hidden';
		}
		
	};
}(nooline));