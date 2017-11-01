/**
 * Created by eyeslikeflame on 03.04.17.
 */

angular.module('revisionApp').controller('TapRightWordController', ['$scope', '$timeout', 'MainService', function ($scope, $timeout, MainService) {

	$scope.check = function check(e, ind) {
		var trg, j, answer, bottom;

		trg = e.currentTarget;
		bottom = document.querySelector('.bottom');
		j = 0;
		answer = $scope.partData.lesson_part_data.top[ind].id;
		$scope.check = function(){};

		MainService.checkAnswer(answer, $scope.partData.lesson_part.test_model)
			.success(function (d) {
				revision.common.moveTheBlock(trg, j);

				// disable items after correct answer
				$timeout(function () {
					var topItems = document.querySelectorAll('.top .item');
					for (var i = 0, l = topItems.length; i < l; i++) {
						topItems[i].style.opacity = '0';
						topItems[i].remove();
					}
				}, 400);

				$scope.$parent.setAnswer(d.result);

				d.result ? bottom.classList.add('correct') : bottom.classList.add('incorrect');

				$timeout(function () {
					$scope.$parent.getPart();
				}, 1200);
			});
	}
}]);