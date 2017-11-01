angular.module('revisionApp').controller('SortingTestRevisionController', ['$scope', 'MainService', function ($scope, MainService) {

    var i = 0,
        answer = [];

    $scope.query = $scope.partData.lesson_part_data[i].data;

    $scope.wordNotMoving = true;

    $scope.check = function(e, n) {

        if (!$scope.checkable) {
            return;
        }

        if ($scope.wordNotMoving) {
            $scope.wordNotMoving = false;
            document.querySelector('.sortingWord').classList.add('moveWord' + n);
            counter(n);
        }
    };

    function counter(n) {

        var obj = {};

        obj[$scope.partData.lesson_part_data[i].id] = $scope.partData.lesson_part_data.category[+n - 1].type;

        answer.push(obj);
        i++;

        if (i >= Object.keys($scope.partData.lesson_part_data).length - 1) {
            MainService.checkAnswer(answer, $scope.partData.lesson_part.test_model)
                .success(function(d) {

                    $scope.setAnswer(d.result);

                    setTimeout(function(){
                        $scope.query = '';
                        $scope.getPart();
                        $scope.wordNotMoving = true;
                    }, 1500);
                });
        } else {
            setTimeout(function() {
                document.querySelector('.sortingWord').classList.remove('moveWord' + n);
                $scope.query = $scope.partData.lesson_part_data[i].data;
                $scope.$apply();
                $scope.wordNotMoving = true;
            }, 1500)
        }
    }
}]);