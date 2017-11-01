angular.module('revisionApp').controller('MatchingWordPictureControler', ['$scope', 'MainService', '$timeout', function ($scope, MainService, $timeout) {

	var answer = [];
	$scope.svgColors = ['#8D979C', '#6FB4C6', '#EF8E56'];

	$scope.draggedElement = null;
	$scope.baseUrlPics = '/Files/Matchingwordpicturetest/';
	$scope.imagesArray = [];

	for (var k = 0, l = $scope.partData.lesson_part_data.images.length; k < l; k++) {
		$scope.imagesArray.push($scope.partData.lesson_part_data.images[k]);
	}

	$scope.dragHandlerOver = function (e) {
		e.preventDefault();
	};

	$scope.dropHandler = function (e) {
		var trg, parent, index;
		trg = e.currentTarget;
		parent = trg.parentNode;
		index = +parent.getAttribute('data-index');
		$scope.check(index, parent);
	};

	$scope.check = function (i, el) {

		var index, rope;

		index = +$scope.draggedElement.getAttribute('data-index');
		$scope.draggedElement.style.opacity = 1;
		rope = $scope.draggedElement.querySelectorAll('.rope');

		for (var j = 0, l = rope.length; j < l; j++) {
			rope[j].classList.remove('hidden');
		}

		$scope.draggedElement.classList.remove('draggable');

		el.querySelector('.extra').appendChild($scope.draggedElement);
		el.querySelector('._dragover_element').remove();

		document.querySelector('._clone').remove();

		answer.push([$scope.partData.lesson_part_data.words[index], $scope.partData.lesson_part_data.images[i]]);

		if (answer.length === 3) {
			var bottomItems = document.querySelectorAll('.bottom .item._dragover');

			MainService.checkAnswer(answer, $scope.partData.lesson_part.test_model)
				.then(function (d) {
					var result = d.data.arrResult;

					for (var k = 0, l = result.length; k < l; k++) {
						if (!result[k]) {
							bottomItems[k].classList.add('incorrect');
							el.parentNode.classList.add('not');
						}
					}

					$timeout(function () {
						$scope.setAnswer(d.data.result);
					}, 500);

					$timeout(function () {
						$scope.getPart();
					}, 1500);
				});
		}
	};
}]);