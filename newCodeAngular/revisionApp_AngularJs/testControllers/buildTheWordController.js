angular.module('revisionApp').controller('BuildTheWordController', ['$scope', '$timeout', 'MainService', function ($scope, $timeout, MainService) {

	var answer, counter;
	answer = [];
	counter = revision.common.counter();

	/**
	 * Loop for bottom words/letters to be written down to the answer array
	 */
	for (var i = 0; i < $scope.partData.lesson_part_data.bottom.length; i++) {
		answer[i] = $scope.partData.lesson_part_data.bottom[i];
	}

	$scope.check = check;

	/**
	 * Function for check 'build the word' or 'build the sentence' test type.
	 * After completing the test, request is sent to the back-end to check the answer
	 * @param e - event object
	 * @param i - index of top or bottom element. Integer
	 */
	function check(e, i) {

		/**
		 * Loop for finding empty element in the answer array. j is the index for the fist empty word/letter
		 */
		for (var j = 0; j < answer.length; j++) {
			if (!answer[j]) {
				break;
			}
		}

		var trg;

		trg = e.currentTarget;

		/**
		 * Check whether top or bottom element has been clicked
		 */
		if (trg.classList.contains('_top') && trg.classList.contains('_tappable')) {
			answer[j] = $scope.partData.lesson_part_data.top[i].data;
			counter.count();
		} else if (trg.classList.contains('_bottom') && trg.classList.contains('_tappable')) {
			answer[trg.getAttribute('data-index')] = null;
			counter.minus();
		}

		revision.common.moveTheBlock(trg, j);

		if (counter.current() === $scope.partData.lesson_part_data.top.length) {
			$scope.check = function () {
				return false
			};

			/**
			 * Send answer to back-end.
			 * answer is an array of strings
			 * answer.length == $scope.partData.lesson_part_data.bottom.length
			 * $scope.partData.lesson_part.test_model == '4'
			 */
			MainService.checkAnswer(answer, $scope.partData.lesson_part.test_model)
				.success(function (d) {
					$scope.$parent.setAnswer(d.result);

					$timeout(function () {
						$scope.$parent.getPart();
					}, 1000);
				});
		}
	}
}]);