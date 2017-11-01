angular.module( 'revisionApp' ).controller( 'MainController', [ '$scope', '$timeout', '$interval', 'MainService', function ( $scope, $timeout, $interval, MainService ) {
    'use strict';
    
    $scope.lessonTypeName = {
        "0": {
            name: ""
        },
        "3": {
            name: "Listening"
        },
        "4": {
            name: "Entertainment"
        },
        "2": {
            name: "Grammar"
        },
        "5": {
            name: "Lexis"
        },
        "6": {
            name: "Speaking"
        },
        "7": {
            name: 'Lexis'
        }
    };
    $scope.testElementColors = [ '#EF8E56', '#8D979C', '#6FB4C6', '#968073', '#CDA794' ];
    
    $scope.index = -1;
    $scope.file = '';
    $scope.data = {};
    $scope.partData = {};
    $scope.dots = [];
    $scope.currentAnswer = 0;
    $scope.time = 0;
    var end = false;
    
    MainService.all().then( function ( data ) {
        if ( data.data instanceof Array ) {
            // location.href = '/';
            return false;
        }
        $scope.data = data.data;
        
        //for check pulse
        if ( data.data.lesson_data.lesson_type == 8 ) {
            $scope.getPart();
            return false;
        }
        
        /**
         * Array of 'dots'. Indication at the top of the screen.
         * 0 - for dot
         * 1 - for correct answer
         * 2 - fot incorrect answer
         */
        $scope.dots = $scope.data.data_object;
        
        for ( var i = 0; i < $scope.data.data_object.length; i++ ) {
            if ( $scope.data.data_object[ i ] === 0 ) {
                $scope.index = i;
                break;
            }
        }
        
        if ( $scope.data.lesson_data.lesson_type != 7 ||
            ($scope.data.lesson_data.lesson_type == 7 && $scope.data.lesson_data.type == 2) ) {
            end = true;
            if ( !$scope.data.data_object.join( '' ).match( '0' ) ) {
                $scope.endThisBlock();
                return false;
            }
        }
        
        if ( !$scope.data.data_object.join( '' ).match( '0' ) && $scope.data.lesson_data.lesson_type == 7 ) {
            $scope.endThisBlock();
            return false;
        }
        
        $scope.index--;
        $scope.getPart();
    } );
    
    /**
     * Function for getting new part of revision a.k.a. test
     */
    $scope.getPart = function () {
        $scope.checkable = true;
        $scope.template = '';
        
        if ( $scope.data.lesson_data.lesson_type != 8 ) {
            if ( $scope.index >= $scope.data.data_object.length - 1 ) {
                $scope.endThisBlock();
                return;
            }
            
            if ( $scope.index >= $scope.data.data_object.length - 1 && $scope.data.lesson_data.lesson_type != 7 ) {
                end = true;
            }
        }
        
        MainService.sendDataPart().success( function ( data ) {
            if ( data.redirect ) {
                location.href = '/';
                return false;
            }
            $scope.currentAnswer = 0;
            
            $scope.partData = data;
            
            $scope.template = '/Files/TestprototypeSocialRevision/' + $scope.partData.lesson_part.test_prototype;
            $scope.index++;
            $scope.timer.start();
        } )
    };
    
    $scope.endThisBlock = function () {
        var whichEnd = $scope.data.lesson_data.lesson_type == 7 ? (end ? 3 : 2) : 1;
        MainService.setRevisionResult( whichEnd ).then( function ( d ) {
            if ( d.data instanceof Array ) {
                location.href = '/';
                return false;
            }
            
            $scope.data = d.data;
            $scope.dots = d.data.data_object;
            
            for ( var i = 0; i < $scope.data.data_object.length; i++ ) {
                if ( $scope.data.data_object[ i ] === 0 ) {
                    $scope.index = i;
                    break;
                }
            }
            $scope.index--;
            $scope.getPart();
            end = true;
        } );
    };
    
    /**
     * Function, which indicates to user whether answer was correct or incorrect. Both dots and tick/cross
     * 0 - for dot / timer
     * 1 - for correct answer
     * 2 - fot incorrect answer
     * @param result Mostly it is the answer from server. Boolean.
     */
    $scope.setAnswer = function ( result ) {
        $scope.timer.stop();
        if ( $scope.data.lesson_data.lesson_type == 8 ) return false;
        
        if ( result ) {
            $scope.dots[ $scope.index ] = 1;
            $scope.currentAnswer = 1;
        } else {
            $scope.dots[ $scope.index ] = 2;
            $scope.currentAnswer = 2;
        }
    };
    
    /**
     * Object with timer
     * @type {{start, stop}}
     */
    $scope.timer = (function () {
        var i, offset, circle, interval, initialTime;
        offset = 500;
        circle = document.querySelector( '._circleAnimation' );
        i = 0;
        
        /**
         * Starts a timer.
         * Note, that all animation goes within css. Here you can only manipulate increments and dasharray length
         */
        function start() {
            initialTime = $scope.partData.timer_for_revision || 30;
            $scope.time = initialTime;
            
            circle.style.strokeDashoffset = 0;
            circle.style.strokeDasharray = offset;
            
            /**
             * Timer itself
             * @type {number}
             */
            interval = setInterval( function () {
                i++;
                $scope.time--;
                $scope.$apply();
                circle.style.strokeDashoffset = -(400 / initialTime) * i;
                if ( !$scope.time ) {
                    timeIsOut();
                }
            }, 1000 );
        }
        
        function stop() {
            i = 0;
            clearInterval( interval );
        }
        
        /**
         * Call this function when the time is over
         */
        function timeIsOut() {
            stop();
            $scope.setAnswer();
            $timeout( function () {
                MainService.checkAnswer( [], $scope.partData.lesson_part.test_model ).then( function ( d ) {
                    $scope.getPart();
                } );
            } );
        }
        
        return {
            start: start,
            stop: stop
        }
    })();
} ] );