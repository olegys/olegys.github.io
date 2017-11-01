angular.module('revisionApp').controller('BeethovenController', ['$scope', '$timeout', 'MainService', function($scope, $timeout, MainService) {
	var answer, correct, counter;
	var sounds = [];
	$scope.baseUrlPics = '/Files/TestBeethovenFiles/';
	$scope.soundAfter = '/Files/TestSound/';
	counter = revision.common.counter();
	answer = [];

	for (var i = 0; i < $scope.partData.lesson_part_data.length; i++) {
		sounds.push(new Audio($scope.baseUrlPics + $scope.partData.lesson_part_data[i].audio));
		answer.push(null);
	}

	$scope.soundPlay = function(e, i) {
		var trg, was;
		trg = e.currentTarget;
		was = trg.getAttribute('data-index-was');
		if (trg.classList.contains('_tappable')) {
			sounds[was || i].play();
		}
	};

	$scope.soundStop = function(e, i) {
		var trg, was;
		trg = e.currentTarget;
		was = trg.getAttribute('data-index-was');
		if (trg.classList.contains('_tappable')) {
			sounds[was || i].pause();
			sounds[was || i].currentTime = 0;
		}
	};

	$scope.check = function(e, i) {
		//bottom check;
		for (var j = 0; j < answer.length; j++) {
			if (!answer[j]) {
				break;
			}
		}

		var trg;
		trg = e.currentTarget;

		if (trg.classList.contains('_top') && trg.classList.contains('_tappable')) {
			answer[j] = $scope.partData.lesson_part_data[i].id;
			counter.count();
			$scope.soundStop(e, i);
		} else if (trg.classList.contains('_bottom') && trg.classList.contains('_tappable')) {
			answer[trg.getAttribute('data-index')] = null;
			counter.minus();
			$scope.soundStop(e);
		}

		revision.common.moveTheBlock(trg, j);

		if (counter.current() >= answer.length) {
			MainService.checkAnswer(answer, $scope.partData.lesson_part.test_model)
				.success(function(d) {
					$timeout(function() {
						if (d.result) {
							document.querySelector('.bottom').classList.add('correct', 'merge');
							correct = new Audio($scope.soundAfter + d.sound);
							correct.play();
							correct.onended = function () {
								$scope.getPart();
							};
						} else {
							document.querySelector('.bottom').classList.add('incorrect');
							$timeout(function() {
								$scope.getPart();
							}, 1500);
						}
					}, 500);
					$timeout(function() {
						$scope.setAnswer(d.result);
					}, 1000);
				});

			$scope.soundPlay = function() {};
			$scope.check = function() {};
		}
	}
}]);