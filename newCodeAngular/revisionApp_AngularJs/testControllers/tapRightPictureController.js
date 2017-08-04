angular.module('revisionApp').controller('TapRightPictureController', ['$scope', '$timeout', 'MainService', function ($scope, $timeout, MainService) {
	$scope.baseUrlPics = '/Files/Chooserighttest/';
	$scope.query = $scope.partData.lesson_part.dataQuestion;

	$scope.check = function (e, index) {
		var trg, items;
		items = document.querySelectorAll('.tapRightPicture .item');
		trg = e.currentTarget;

		$scope.check = function () {
		};

		MainService.checkAnswer($scope.partData.lesson_part_data[index].id_test_question_choose_right, $scope.partData.lesson_part.test_model)
		.success(function(d) {

			for (var i = 0; i < $scope.partData.lesson_part_data.length; i++) {
				items[i].classList.add('disabled');

				if (d.result && i !== index) {
					items[i].classList.add('opacity');
				}
			}

			if (d.result) {
				trg.classList.add('correct');
			} else {
				trg.classList.add('incorrect');
				trg.parentNode.classList.add('not');
			}

			$scope.setAnswer(d.result);

			$timeout(function(){
				$scope.getPart();
			}, 1500);
		});
	};
}]);