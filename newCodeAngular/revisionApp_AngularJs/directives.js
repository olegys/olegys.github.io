angular.module('revisionApp').directive('lessonIcon', ['$compile', function ($compile) {
	'use strict';
	return {
		restrict: 'A',
		scope: {
			type: '=',
		},
		link: function (scope, element) {
			var object;
			scope.$watch('type', function (n) {
				applyIcon(n);
			});
			//todo refactor. Move this object elsewhere to prevent it's creation every time directive is created
			object = {
				//grammar
				'2': '<svg class="mainRevisionIcon colorGrammar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">' +
				'<path fill="#FFDD75" d="M75.6,40c-4.9,0-8.9,4-8.9,8.9c0,1.9,0.6,3.7,1.7,5.2l-3.2,4.6c-0.8-0.2-1.5-0.3-2.4-0.3c-2.1,0-4,0.7-5.5,1.9l-18.9-12l-3.2,5.1l18.9,12.1c-0.1,0.6-0.2,1.2-0.2,1.9c0,4.9,4,8.9,8.9,8.9c4.9,0,8.9-4,8.9-8.9c0-1.9-0.6-3.6-1.6-5.1l3.2-4.7c0.7,0.2,1.5,0.3,2.3,0.3c4.9,0,8.9-4,8.9-8.9C84.5,44,80.5,40,75.6,40z"/>' +
				'<circle fill="#FFFFFF" cx="37" cy="50.6" r="14.1"/>' +
				'<circle fill=""></circle>' +
				'</svg>',
				//listening
				'3': '<svg class="mainRevisionIcon colorListening" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">' +
				'<path fill="#8D979C" d="M82.9,64.6h-5.6V52.9C77.3,40,66.9,29.6,54,29.6S30.7,40,30.7,52.9v10.7h-5.6V52.9C25.1,36.9,38,24,54,24s28.9,13,28.9,28.9V64.6z"/>' +
				'<path fill="#EF8E56" d="M83.1,64.6c0-8.1-5.9-14.8-13.7-16c-0.4-0.1-2.4-0.2-2.5,2.3c0,2.5,0,25,0,27.5c0,2.5,2.1,2.3,2.4,2.3c7.8-1.2,13.7-7.9,13.7-15.9C83.1,64.7,83.1,64.6,83.1,64.6C83.1,64.6,83.1,64.6,83.1,64.6z"/>' +
				'<path fill="#EF8E56" d="M24.9,64.6c0-8.1,5.9-14.8,13.7-16c0.4-0.1,2.4-0.2,2.5,2.3c0,2.5,0,25,0,27.5c0,2.5-2.1,2.3-2.4,2.3c-7.8-1.2-13.7-7.9-13.7-15.9C24.9,64.7,24.9,64.6,24.9,64.6C24.9,64.6,24.9,64.6,24.9,64.6z"/>' +
				'</svg>',
				//entertainment
				'4': '<svg class="mainRevisionIcon colorEntertainment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">' +
				'<path fill="#FFFFFF" d="M20.5,42.1L20.5,42.1l-0.1,24.1h21c3.5,0,6.5-1.8,8.3-4.4c0,0,0,0,0,0c1-1.4,2.5-2.3,4.3-2.3c1.7,0,3.1,0.8,4.1,2.1c1.8,2.8,4.9,4.6,8.4,4.6h21V42.1H20.5z"/>' +
				'<path fill="#8D979C" d="M40.5,59.4h-9.2c-3,0-5.5-2.4-5.5-5.3c0-2.9,2.5-5.3,5.5-5.3h9.2c3,0,5.5,2.4,5.5,5.3C46,57.1,43.5,59.4,40.5,59.4z"/>' +
				'<path fill="#EF8E56" d="M76.7,59.4h-9.2c-3,0-5.5-2.4-5.5-5.3c0-2.9,2.5-5.3,5.5-5.3h9.2c3,0,5.5,2.4,5.5,5.3C82.2,57.1,79.7,59.4,76.7,59.4z"/>' +
				'</svg>',
				//lexis
				'5': '<svg class="mainRevisionIcon colorLexis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">' +
				'<polygon fill="#FFFFFF" points="56.3,79.6 56.3,87.8 61.4,85.1 66.4,87.8 66.4,79.6 "/>' +
				'<path fill="#FFDD75" d="M76.2,76.7c0,1.7-1.3,3-3,3H34.8c-1.7,0-3-1.3-3-3V31.3c0-1.6,1.4-3,3-3h38.4c1.7,0,3,1.4,3,3V76.7z"/>' +
				'<path fill="#EF8E56" d="M43.2,66.6l-0.9,3.7h-4.4l4.6-15.8h5.6l4.7,15.8h-4.6l-1-3.7H43.2z M46.7,63.5L46,60.7c-0.2-0.9-0.5-2.2-0.8-3.1h0c-0.2,0.9-0.5,2.2-0.7,3.1l-0.7,2.8H46.7z"/>' +
						'<path fill="#EF8E56" d="M56.9,62.8v2.8h-4.3v-2.8H56.9z"/>' +
						'<path fill="#EF8E56" d="M56.7,68.1l7-10V58h-6.3v-3.5h11.9v2.4l-6.8,9.8v0.1h6.9v3.5H56.7V68.1z"/>' +
				'</svg>',
				//revision
				'7': '<svg class="mainRevisionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">' +
				'<path class="color0" d="M48,96v-4.8c23.8,0,43.2-19.4,43.2-43.2S71.8,4.8,48,4.8V0c26.5,0,48,21.5,48,48S74.5,96,48,96z"></path>' +
				'<path class="color1" d="M48,96C21.5,96,0,74.5,0,48S21.5,0,48,0v4.8C24.2,4.8,4.8,24.2,4.8,48S24.2,91.2,48,91.2V96z"></path>' +
				'<path class="color2" d="M44.7,44.2l21.6-17c1.6-1.3,3.9-1,5.1,0.6c1.2,1.5,1,3.6-0.3,4.9l-19.8,19c-2,1.9-5.2,1.9-7.1-0.1c-1.9-2-1.9-5.2,0.1-7.1C44.5,44.4,44.6,44.3,44.7,44.2z"></path>' +
				'</svg>',
				//check pulse
				'8': '<svg class="mainRevisionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">' +
				'<path fill="#EF8E56" d="M36.1,93.4c-0.1,0-0.1,0-0.1,0c-0.9-0.1-1.6-0.7-1.8-1.5l-9.6-51.7L15.1,75c-0.3,0.8-1,1.4-1.9,1.4H7.4c-1.1,0-1.9-0.8-1.9-1.9c0-1.1,0.8-1.9,1.9-1.9h4.4L22.9,31c0.3-0.9,1-1.5,1.9-1.4c0.9,0.1,1.7,0.7,1.8,1.5l9.9,52.5l12-37.9c0.3-0.8,1-1.3,1.9-1.3l0,0c0.8,0,1.6,0.6,1.9,1.3l6.9,22.7l7.1-12.6c0.3-0.6,1-1,1.7-1h36.7c1.1,0,1.9,0.8,1.9,1.9c0,1.1-0.8,1.9-1.9,1.9H69.1l-8.7,15.6c-0.4,0.6-1.1,1-1.9,1c-0.8-0.1-1.4-0.6-1.6-1.3l-6.6-21.1L37.9,92.1C37.7,92.8,36.9,93.4,36.1,93.4z"/>' +
				'<path fill="#8D979C" d="M54,3.9c27.6,0,50.1,22.5,50.1,50.1S81.6,104.1,54,104.1S3.9,81.6,3.9,54S26.4,3.9,54,3.9 M54,0C24.2,0,0,24.2,0,54s24.2,54,54,54s54-24.2,54-54S83.8,0,54,0L54,0z"/>' +
				'</svg>'
			};

			function applyIcon(t) {
				element.html(object[t]);
				$compile(element.contents())(scope);
			}
		}
	}
}]);

/**
 * Directive for randomized rotate & x,y position of elements
 */

angular.module('revisionApp').directive('moveRotate', function () {
	return {
		restrict: 'A',
		link: function (s, el) {
			var rotateAngle = Math.floor(Math.random() * 39) - 20,
				moveX = Math.floor(Math.random() * 3) - 4,
				moveY = Math.floor(Math.random() * 7) - 8;

			el[0].style.cssText += 'transform: rotate(' + rotateAngle + 'deg) translate3d(' + moveX + 'px, ' + moveY + 'px, 0);';
		}
	};
});

/**
 * Directive for randomized background color of elements
 */
angular.module('revisionApp').directive('randomBackground', function () {
	return {
		restrict: 'A',
		scope: {
			index: '=randomBackgroundIndex'
		},
		link: function (s, el) {
			var len, i;
			len = s.$parent.partData.lesson_part_data.top.length;

			if (len < 3) return false;
			i = s.index;

			/**
			 * Shuffle color array when index reaches the latest element of array
			 */
			if (!(i % s.$parent.testElementColors.length)) {
				s.$parent.testElementColors.shuffle();
			}
			el[0].style.background = s.$parent.testElementColors[i % s.$parent.testElementColors.length];
		}
	}
});

angular.module('revisionApp').directive('revisionDraggable', [function() {
	return {
		restrict: 'A',
		link: function(s, el) {
			el[0].setAttribute('draggable', 'true');
			el[0].addEventListener('dragstart', function(e) {
				e.dataTransfer.setData('application/node type', this);
				s.$parent.draggedElement = el[0];
			});
			el[0].addEventListener('dragend', function(e) {
				e.preventDefault();
				if (s.$parent.draggedElement.classList.contains('draggable')) {
					s.$parent.draggedElement.setAttribute('draggable', 'true');
				}
				s.$parent.draggedElement = null;
			});

			revision.common.Drag(el[0]);
		}
	}
}]);

angular.module('revisionApp').directive('revisionDragover', [function() {
	return {
		restrict: 'A',
		link: function(s, el) {
			var div;
			div = document.createElement('div');
			div.className = '_dragover_element';
			el[0].appendChild(div);
			div.addEventListener('dragenter', s.dragHandlerEnter, false);
			div.addEventListener('dragover', s.dragHandlerOver, false);

			div.addEventListener('dragleave', s.dragHandlerLeave, false);
			div.addEventListener('drop', s.dropHandler, false);
		}
	}
}]);