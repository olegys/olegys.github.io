angular.module('revisionApp').controller('TrueFalseController', ['$scope', '$timeout', 'MainService', function($scope, $timeout, MainService) {
	var counter = revision.common.counter(),
		answer = [];
	$scope.query = $scope.partData.lesson_part_data[counter.current()].data;

	$scope.check = check;

	function check(e, n) {
		var obj = {};
		obj[$scope.partData.lesson_part_data[counter.current()].id] = n;
		console.log(counter.current());
		answer.push(obj);
		counter.count();
		if (counter.current() >= Object.keys($scope.partData.lesson_part_data).length) {

			$scope.query = '';
			$scope.check = function () {};

			MainService.checkAnswer(answer, $scope.partData.lesson_part.test_model)
				.success(function(d) {
					$scope.setAnswer(d.result);
					$timeout(function(){
						$scope.getPart();
					}, 1500);
				});
		} else {
			$scope.query = $scope.partData.lesson_part_data[counter.current()].data;
		}
	}
}]);