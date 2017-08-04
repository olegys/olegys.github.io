angular.module('revisionApp').controller('MatchingWordsController', ['$scope', '$timeout', 'MainService', function ($scope, $timeout, MainService) {
	var selected;
	$scope.qLeft = [];
	$scope.qRight = [];
	$scope.dumpData = $scope.partData;

	var ans = [];
	var counter = revision.common.counter();

	for (var i = 0; i < $scope.partData.lesson_part_data.length; i++) {
		$scope.qLeft.push(i);
		$scope.qRight.push(i);
	}

	selected = {
		a: {},
		b: {}
	};

    $scope.select = function (e) {
        var trg = e.currentTarget;
        var p = getPosition(e);
        trg.querySelector('.item').classList.toggle('active');
        var left = function () {
            if (selected.a.el && selected.a.el !== trg) {
                selected.a.el.querySelector('.item').classList.remove('active');
                selected.a = {};
            }
            if (trg.querySelector('.item').classList.contains('active')) {
                selected.a = {
                    el: trg,
                    p: p,
                    moveTo: right,
                    index: trg.getAttribute('data-index'),
                    width: getComputedStyle(trg).width
                };
            } else {
                selected.a = {};
            }
            $scope.check();
        };

        var right = function () {
            if (selected.b.el && selected.b.el !== trg) {
                selected.b.el.querySelector('.item').classList.remove('active');
                selected.b = {};
            }
            if (trg.querySelector('.item').classList.contains('active')) {
                selected.b = {
                    el: trg,
                    p: p,
                    moveTo: right,
                    index: trg.getAttribute('data-index'),
                    width: getComputedStyle(trg).width
                };
            } else {
                selected.b = {};
            }
            $scope.check();
        };

        return {
            left: left,
            right: right
        };
    };

	$scope.check = function () {
		var leftIndex = selected.a.index;
		var rightIndex = selected.b.index;

		if (!selected.b.el || !selected.a.el) return;
		if (!($scope.qLeft[selected.a.index] === $scope.qRight[selected.b.index])) {
			selected.a.el.querySelector('.item').classList.remove('active');
			selected.a = {};
			selected.b.el.querySelector('.item').classList.remove('active');
			selected.b = {};
			return;
		}

		clone(selected.a, true);
		clone(selected.b);
		selected.b = {};
		selected.a = {};
		counter.count();

		if (counter.current() === $scope.qLeft.length) {
			setTimeout(function () {
				$scope.getPart(null, $scope.ind + 1);
			}, 1300);
		}

		ans.push([$scope.partData.lesson_part_data.left[leftIndex], $scope.partData.lesson_part_data.right[rightIndex]]);

		if (counter.current() >= $scope.partData.lesson_part_data.left.length) {
			clearInterval($scope.interval);
			MainService.checkAnswer(ans, $scope.partData.lesson_part.test_model)
				.success(function(d) {
					var center = document.querySelector('.center').children;
					$timeout(function () {
						$scope.setAnswer(d.result);
					}, 500);
					$timeout(function () {
						$scope.getPart();
					}, 1500);
				});
		}
	};

	function getPosition(e) {
		var p = {};

		p.x = e.currentTarget.getBoundingClientRect().left + (e.currentTarget.getBoundingClientRect().width - parseInt(getComputedStyle(e.currentTarget).width)) / 2;
		p.y = e.currentTarget.getBoundingClientRect().top + (e.currentTarget.getBoundingClientRect().height - parseInt(getComputedStyle(e.currentTarget).height)) / 2;

		return p;
	}

	function clone(obj, left) {
		var c = obj.el.cloneNode(true);
		c.querySelector('.item').classList.remove('active');

		obj.el.classList.add('hidden');
		c.style.cssText += 'position: fixed; left:' + (obj.p.x - 15) + 'px; top:' + obj.p.y + 'px; transition: 400ms; width:' + obj.width;
		obj.el.parentNode.appendChild(c);
		moveClone(c, left);
		return c;
	}

	function moveClone(c, left) {
		var center = document.querySelectorAll('._center__block')[counter.current()];
		var position = center.getBoundingClientRect();
		var obj = {
			a: $scope.partData.lesson_part_data.left[selected.a.index],
			b: $scope.partData.lesson_part_data.right[selected.b.index],
			i: counter.current(),
			index: selected.a.index
		};

		c.style.cssText += 'left:' + (left ? position.left - parseInt(getComputedStyle(c).width) : position.left) + 'px;' + 'top:' + position.top + 'px; transform: rotate(0); box-shadow: none;';

		$timeout(function () {
			appendText(obj);
			c.parentNode.remove();
		}, 350);
	}

	function appendText() {
		var a = arguments[0];
		var textBlocks = document.querySelectorAll('._center-item');
		textBlocks[a.i].querySelector('._word-here').innerHTML = a.a + ' ' + a.b;
		textBlocks[a.i].style.cssText += 'opacity:1; visibility: visible';
	}
}]);
