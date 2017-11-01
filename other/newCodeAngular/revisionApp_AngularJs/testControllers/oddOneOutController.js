/**
 * Created by eyeslikeflame on 03.04.17.
 */

angular.module('revisionApp').controller('OddOneOutController', ['$scope', 'MainService', '$timeout', function ($scope, MainService, $timeout) {

	$scope.check = function (e, index) {
		var trg = e.currentTarget;
		$scope.check = function () {
		};

		/**
		 * Check answer on back-end
		 *
		 * MainService.checkAnswer( id, model )
		 * typeof id === 'String'
		 * model === '8'
		 */
		MainService.checkAnswer($scope.partData.lesson_part_data[index].id, $scope.partData.lesson_part.test_model)
			.success(function (d) {
				var words = document.querySelectorAll('.wrapper .word'),
					k = 0;



				while (words[k]) {
					if (k !== index) {
						words[k].classList.add('incorrect');
					}
					k++;
				}

				$scope.$parent.setAnswer(d.result);

				if (d.result) {
					trg.classList.add('correct');
					$timeout(function () {
						trg.remove();
					}, 300);
				} else {
					trg.parentNode.classList.add('not');
					trg.classList.add('setWrong');
				}

				setTimeout(function () {
					$scope.getPart();
				}, 1000);
			});
	};
}]);