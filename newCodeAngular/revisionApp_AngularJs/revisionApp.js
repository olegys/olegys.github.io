angular.module('revisionApp', []);

window.onload = function() {
	document.body.style.opacity = '1';
};

var common = require('./common.js'),
	directives = require('./directives.js'),
	controller = require('./mainController.js'),
	services = require('./services.js');

var buildTheWord = require('./testControllers/buildTheWordController.js'),
	tapRightWord = require('./testControllers/tapRightWordController.js'),
	matchingWords = require('./testControllers/MatchingWordsController.js'),
	tapRightPicture = require('./testControllers/TapRightPictureController.js'),
	matchingWordPicture = require('./testControllers/MatchingWordPictureController.js'),
    sorting = require('./testControllers/sortingController'),
	oddOneOut = require('./testControllers/oddOneOutController.js'),
	trueFalse = require('./testControllers/trueFalseController.js'),
	beethoven = require('./testControllers/BeethovenController.js');

exports.common = common;