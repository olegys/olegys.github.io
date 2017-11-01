angular.module('revisionApp').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}]);

angular.module('revisionApp').service('MainService', ['$http', function($http) {
    function all(t) {
        if (t) {
            return $http({
                method: 'POST',
                url: location.href,
                data: 'method=getRevisionData&type=' + t
            });
        } else {
            return $http({
                method: 'POST',
                url: location.href,
                data: 'method=getRevisionData'
            });
        }
    }

    function sendDataPart() {
        return $http({
            method: 'POST',
            url: location.href,
            data: 'method=getRevisionPartData'
            });
    }
    function skip(id) {
        return $http({
            method: 'POST',
            url: location.href,
            data: 'method=setLessonStatus&idLesson=' + id
        });
    }

    function checkAnswer(answer, model) {
        return $http({
            method: 'POST',
            url: location.href,
            data: 'method=setQuestionResult&result=' + JSON.stringify(answer) + '&test_model=' + model
        });
    }
    function setRevisionResult(end) {
        return $http({
            method: 'POST',
            url: location.href,
            data: 'method=setRevisionResult&end=' + end
        });
    }
    return {
        all: all,
        sendDataPart: sendDataPart,
        skip: skip,
        checkAnswer: checkAnswer,
        setRevisionResult: setRevisionResult
    };
}]);