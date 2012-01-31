(function(N) {
	N.onNav = function(element, direction) {
		
		var onElement = false,
			x,
			y;
		
		var toon = document.getElementById('toon');
		
		document.onmousemove = function(e) {
			if (!e) {
				e = window.event;
				
				x = e.clientX;
				y = e.clientY;
			} else {
				x = e.pageX;
				y = e.pageY;
			}
			
			if ((x < element.offsetLeft) ||
					(x > (element.offsetLeft + element.offsetWidth)) ||
					(y < element.offsetTop) ||
					(y > (element.offsetTop + element.offsetHeight))) {
				onElement = false;
				
				toon.className = 'toon';
			}
		};
		
		element.onmouseover = function() {
			if ((x > element.offsetLeft) &&
					(x < (element.offsetLeft + element.offsetWidth)) &&
					(y > element.offsetTop) &&
					(y < (element.offsetTop + element.offsetHeight)) &&
					(!onElement)) {
				onElement = true;
				
				toon.className += ' moving-out';
				
				for (var i = 0, kids = element.children.length; i < kids; i++) {
					element.children[i].onmouseover = function() {
						var self = this;
						setTimeout(function() {
							toon.className = 'toon ' + self.children[0].id;
						}, 100);
					}
				}
			}
		};
		
	};
}(Newline));