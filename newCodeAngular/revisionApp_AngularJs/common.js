var counter = function () {
	var c = 0;
	var count = function () {
		return ++c;
	};

	var minus = function () {
		return --c;
	};

	var current = function () {
		return c;
	};

	return {
		count: count,
		minus: minus,
		current: current
	};
};

var shuffle = function (array) {
	'use strict';
	var m = array.length, t, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
};

Array.prototype.shuffle = function () {
	shuffle(this);
};

var moveTheBlock = function (a, b) {

	var isChrome = !!window.chrome && !!window.chrome.webstore;

	if (!document.querySelector('._tappable')) {
		throw new Error('This function is supposed to move elements with ._tappable');
	}

	if (!a.classList.contains('_tappable')) return;

	var trgCoordinates, newCoordinates, tween;

	function Errors(st) {
		switch (st) {
			case 'no-bottom':
				throw new Error('There is no _bottom');
			default:
				throw new Error('Something bad is going on');
		}
	}

	a.classList.toggle('_tappable');
	trgCoordinates = {
		x: a.getBoundingClientRect().left,
		y: a.getBoundingClientRect().top,
	};

	if (a.classList.contains('_top')) {
		b = document.querySelectorAll('._bottom._empty')[b] || Errors('no-bottom');
		//объект с поправками на отклонение
		var err = {
			w: (a.getBoundingClientRect().width - parseInt(getComputedStyle(a).width) + parseInt(getComputedStyle(a).width) - parseInt(getComputedStyle(b).width)) / 2,
			h: (a.getBoundingClientRect().height - parseInt(getComputedStyle(a).height) + parseInt(getComputedStyle(a).height) - parseInt(getComputedStyle(b).height)) / 2,
		};
		newCoordinates = {
			x: b.getBoundingClientRect().left - err.w,
			y: b.getBoundingClientRect().top - err.h
		};
		b.setAttribute('data-index-was', a.getAttribute('data-index'));

		a.classList.add('rotate_cube', isChrome && 'perspective');

		a.transform = getComputedStyle(a).transform;

		tween = TweenMax.to(a, 0.4, {
			startAt: {
				rotation: a.dataRotate,
				zIndex: 99
			},
			x: newCoordinates.x - trgCoordinates.x,
			y: newCoordinates.y - trgCoordinates.y,
			onComplete: function () {
				a.style.cssText += 'opacity: 0; z-index: 0';
				a.classList.add('visibility');
				b.classList.contains('empty') && b.classList.remove('empty');
				b.innerHTML = a.querySelector('._copy-this') ? a.querySelector('._copy-this').innerHTML : a.innerHTML;
				b.classList.toggle('_tappable');
				a.classList.remove('rotate_cube');
			},
			rotation: 0,
		});
	} else if (a.classList.contains('_bottom')) { //for bottom element
		b = document.querySelectorAll('._top')[a.getAttribute('data-index-was')];
		b.classList.add('reverse_rotate_cube');

		a.removeAttribute('data-index-was');
		tween = TweenMax.to(b, 0.4, {
			startAt: {
				opacity: 1,
				zIndex: 99
			},
			x: 0,
			y: 0,
			onStart: function () {
				a.classList.add('empty');
				b.classList.remove('visibility');
				a.innerHTML = '';
			},
			onComplete: function () {
				b.classList.contains('empty') && b.classList.remove('empty');
				b.classList.add('_tappable');
				b.classList.remove('reverse_rotate_cube');
				b.style.cssText = 'transform: ' + b.transform;
			},
			zIndex: 0,
			rotation: b.dataRotate
		});
	}
};

var Drag = function (element) {

	var clone, clickOffsetX, clickOffsetY, startOffsetX, startOffsetY, checkFuckingMozilla;
	checkFuckingMozilla = typeof InstallTrigger !== 'undefined';

	element.addEventListener('dragstart', dragStart, false);
	element.addEventListener('dragend', dragEnd, false);

	function dragStart(e) {
		e.dataTransfer.setData('application/node type', this);
		if (this.getAttribute('draggable') !== 'true') return;
		document.querySelector('._clone') && document.querySelector('._clone').remove();
		this.setAttribute('draggable', false);
		clone = makeClone();
		clickOffsetX = e.layerX;
		clickOffsetY = e.layerY;
		startOffsetX = e.x - e.layerX;
		startOffsetY = e.y - e.layerY;
		this.style.opacity = 0;

		if (checkFuckingMozilla) {
			document.addEventListener('dragover', drag, false)
		} else {
			element.addEventListener('drag', drag, false);
		}
	}

	function drag(e) {
		if (e.clientX === 0 && e.clientY === 0) {
			return;
		}
		moveClone(e.clientX - clickOffsetX, e.clientY - clickOffsetY);
	}

	function dragEnd() {
		var self = this;
		clone.style.cssText += 'top: ' + startOffsetY + 'px; left: ' + startOffsetX + 'px;transition: 200ms';
		element.removeEventListener('mousemove', drag, false);
		setTimeout(function () {
			self.style.opacity = 1;
			clone.remove();
		}, 200);
	}

	function makeClone() {
		var c = element.cloneNode(true);
		c.classList.add('_clone');
		c.removeAttribute('draggable');
		document.querySelector('.top').appendChild(c);
		styleClone(c);
		return c;
	}

	function styleClone(c) {
		c.style.position = 'fixed';
		c.style.zIndex = 1;
		c.style.left = '-9999px';
		c.style.margin = 0;
	}

	function moveClone(x, y) {
		clone.style.left = x + 'px';
		clone.style.top = y + 'px';
	}
};

exports.moveTheBlock = moveTheBlock;
exports.counter = counter;
exports.Drag = Drag;