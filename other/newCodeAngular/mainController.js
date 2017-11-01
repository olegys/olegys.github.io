angular.module('cabinetApp').controller('MainController', ['$http', '$scope', '$route', 'MainService',  function ($http, $scope) {

    var testData = [{
        "id_curriculum_lesson": "11",
        "lesson_name": "The There is / are",
        "lesson_type": "5",
        "lesson_price": "0.49",
        "lesson_next_status": 0
    }, {
        "id_curriculum_lesson": "11",
        "lesson_name": "The There is / are",
        "lesson_type": "5",
        "lesson_price": "0.49",
        "lesson_next_status": 0
    }, {
        "id_curriculum_lesson": "11",
        "lesson_name": "The There is / are",
        "lesson_type": "2",
        "lesson_price": "0.49",
        "lesson_next_status": 0
    }, {
        "id_curriculum_lesson": "11",
        "lesson_name": "The There is / are",
        "lesson_type": "3",
        "lesson_price": "0.49",
        "lesson_next_status": 0
    }, {
        "id_curriculum_lesson": "11",
        "lesson_name": "The There is / are",
        "lesson_type": "4",
        "lesson_price": "0.49",
        "lesson_next_status": 0
    }, {
        "id_curriculum_lesson": "11",
        "lesson_name": "The There is / are",
        "lesson_type": "0",
        "lesson_price": "0.49",
        "lesson_next_status": 0
    }];

    var data = {
        "user_data": {
            "first_name": "",
            "second_name": "",
            "balance": "94.65",
            "email": "e@e.com",
            "registred_data": "2016-08-26 11:23:14",
            "date_lastlogin": "2017-02-15 09:22:38",
            "country": "230",
            "gender": "1",
            "date_birthday": null,
            "language": "1",
            "social_name": null,
            "avatarka": "/img/users_avatars/neutral.png"
        },
        "lesson_data": [
            {
                "date": "2017-02-10", "value": null
            },
            {
                "date": "2017-02-11", "value": null
            },
            {
                "date": "2017-02-12", "value": null
            },
            {
                "date": "2017-02-13", "value": null
            },
            {
                "date": "2017-02-14", "value": null
            },
            {
                "date": "2017-02-15", "value": null
            },
            {
                "date": "2017-02-16", "value": null
            }],
        "skill_data": [
            [
                {"date": "0 2017-02-10", "value": "0"},
                {"date": "12 2017-02-10", "value": "0"},
                {"date": "12 2017-02-11", "value": "0"},
                {"date": "12 2017-02-12", "value": "0"},
                {"date": "12 2017-02-13", "value": "0"},
                {"date": "12 2017-02-14", "value": "0"},
                {"date": "12 2017-02-15", "value": "0"},
                {"date": "12 2017-02-16", "value": "0"},
                {"date": "24 2017-02-16", "value": "0"}
            ],
            [
                {"date": "0 2017-02-10", "value": "0"},
                {"date": "12 2017-02-10", "value": "0"},
                {"date": "12 2017-02-11", "value": "0"},
                {"date": "12 2017-02-12", "value": "0"},
                {"date": "12 2017-02-13", "value": "0"},
                {"date": "12 2017-02-14", "value": "0"},
                {"date": "12 2017-02-15", "value": "0"},
                {"date": "12 2017-02-16", "value": "0"},
                {"date": "24 2017-02-16", "value": "0"}
            ],
            [
                {"date": "0 2017-02-10", "value": "0"},
                {"date": "12 2017-02-10", "value": "0"},
                {"date": "12 2017-02-11", "value": "0"},
                {"date": "12 2017-02-12", "value": "0"},
                {"date": "12 2017-02-13", "value": "0"},
                {"date": "12 2017-02-14", "value": "0"},
                {"date": "12 2017-02-15", "value": "0"},
                {"date": "12 2017-02-16", "value": "0"},
                {"date": "24 2017-02-16", "value": "0"}
            ]
        ],
        "graf_data": [
            {"date": "2017-02-10", "value": 0},
            {"date": "2017-02-11", "value": 0},
            {"date": "2017-02-12", "value": 0},
            {"date": "2017-02-13", "value": 0},
            {"date": "2017-02-14", "value": 0},
            {"date": "2017-02-15", "value": 0},
            {"date": "2017-02-16", "value": 0}
        ],
        "sum_skill_data": [["97", "3"], ["71", "29"], ["75", "25"], ["0", "0"]],
        "next_object_data": {
            "next_lesson": testData[0]
        }
    };

    var slider = document.querySelectorAll('.inner-slider .slider_content'),
        dotsNumber = document.querySelectorAll('.dots'),
        rightNav = document.querySelector('.right_nav'),
        leftNav = document.querySelector('.left_nav'),
        dotsContainer = document.querySelector('.dots_container'),
        templateName = 'userskills',
        pos = 0,
        finished = false,
        timeSlider,
        firstCircle;

    var userSkillsData = {
        0: [['140', '140'], ['250', '250'], ['120', '100']],
        1: [['23', '45'], ['65', '45'], ['234', '1060']],
        2: [['45', '3'], ['34', '250'], ['67', '100']],
        3: [['64', '76'], ['868', '964'], ['367', '736']],
        4: [['56', '72'], ['858', '947'], ['386', '76']],
        5: [['86', '79'], ['788', '934'], ['436', '676']],
        6: [['96', '70'], ['88', '94'], ['386', '746']],
        7: [['69', '07'], ['882', '946'], ['6', '776']]
    };

    var skillData = [
        [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
        [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
        [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 15, 10]],
        [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 25, 20], [0, 0, 0, 0, 0, 0, 15, 7, 5]],
        [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 25, 20], [0, 0, 0, 0, 0, 0, 15, 7, 5]],
        [[0, 0, 0, 0, 0, 0, 0, 35, 32], [0, 0, 0, 0, 0, 0, 25, 17, 17], [0, 0, 0, 0, 0, 15, 7, 5, 7]],
        [[0, 0, 0, 0, 40, 35, 30, 35, 35], [0, 0, 28, 15, 15, 15, 50, 40, 35], [0, 15, 7, 7, 7, 50, 35, 35, 30]],
        [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
    ];

    $scope.lessonTypeName = {
        "0": {
            name: null
        },
        "2": {
            name: "Grammar"
        },
        "3": {
            name: "Listening"
        },
        "4": {
            name: "Entertainment"
        },
        "5": {
            name: "Lexis"
        },
        "6": {
            name: "Speaking"
        },
        "7": {
            name: "Revision"
        },
        "8": {
            name: "Short Test Control"
        }
    };
    $scope.data = data;
    $scope.avatar = '/img/users_avatars/neutral.png';
    $scope.nextLesson = {};
    $scope.nextLesson = testData[0];
    $scope.userSkills = {};

    if (pos >= 5) {
        document.location.replace(document.location.href.replace(templateName, ''));
        document.location.replace(document.location.href + templateName);
    } else {
        document.location.replace(document.location.href.replace(templateName, '') + "#");
    }

    function showSlide(index) {
        for (var i = 0; i < slider.length; i++) {
            slider[i].style.display = 'none';
        }
        slider[index].style.display = 'block';
    }

    function showDots(index) {
        for (var i = 0; i < dotsNumber.length; i++) {
            if (dotsNumber[i].classList.contains('dots_active')) {
                dotsNumber[i].classList.remove('dots_active');
                dotsNumber[index].classList.add('dots_active');
                break;
            }
        }
    }

    function compareUrl(position) {
        if (position >= 5) {
            document.location.replace(document.location.href.replace(templateName, ''));
            document.location.replace(document.location.href + templateName);
            $scope.nextLesson = testData[5];
            $scope.$apply();
        } else {
            document.location.replace(document.location.href.replace(templateName, ''));
            $scope.nextLesson = testData[pos];
            $scope.$apply();
        }
    }

    function moveRocket(value) {

        var currentPosition = 0;

        if (document.querySelector('#bezierLine')) {
            currentPosition = document.querySelector(".number").innerHTML;
        }

        $scope.data.graf_data = [
            {"date": "2017-02-14", "value": 0},
            {"date": "2017-02-15", "value": currentPosition},
            {"date": "2017-02-16", "value": value}
        ];

        if (document.querySelector('#bezierLine')) {
            document.querySelector('#bezierLine').remove();
        }

        demo.graphs.buildCurves($scope.data.graf_data);
    }

    function graphOpacity(index) {
        var path = document.querySelectorAll('.waves svg g path');
        for (var i = 0; i < path.length; i++) {
            if (i == index) {
                path[i].style.opacity = '0.93';
            } else {
                path[i].style.opacity = '1';
            }
        }
    }

    function graphsBuilder(slideIndex) {
        $scope.data.skill_data.map(function(item, i) {
           item.map(function(value, j) {
               value.value = skillData[slideIndex][i][j];
           })
        });
    }

    function addLessonData(number, array) {
        var j = 0;
        for (var i = 0; i < $scope.data.lesson_data.length; i++) {
            if (i >= number && array) {
                if (j === 6) {
                    $scope.data.lesson_data[i].value = [{
                        'user_grammar_persent': '100',
                        'user_lexic_persent': '100',
                        'user_grammar_result': 't',
                        'user_lexic_result': 't',
                        'user_score': 100,
                        'user_score_status': '4',
                        'user_score_interface_value': array[j++]
                    }];
                } else {
                    $scope.data.lesson_data[i].value = [{
                        'user_score': 100,
                        'user_score_status': '4',
                        'user_score_interface_value': array[j++]
                    }];
                }
            } else {
                $scope.data.lesson_data[i].value = null;
            }
        }
    }

    /**
     *
     * function for left side menu (about, share etc.)
     */
    function sideMenu() {
        var items = document.querySelectorAll('.shareList a');
        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener('mouseenter', changeBackground, false);
        }
        
        function changeBackground(e) {
            var trg = e.currentTarget;
            trg.parentNode.className = 'shareList ' + trg.className + '-color';
        }
    }

    sideMenu();
    
    function addPulsation() {
        var i;
        
        for(i = 0; i < arguments.length; ++i) {
            arguments[i].classList.add('pulse');
        }
    }
    
    function clearPulsation() {
        var pulseArr = document.querySelectorAll('.pulse'),
            i;
        
        for(i = 0; i < pulseArr.length; ++i) {
            pulseArr[i].classList.remove('pulse');
        }
        document.querySelector('.area_1').classList.remove('wavesPulse1');
        document.querySelector('.area_2').classList.remove('wavesPulse2');
    }

    goToNextSlide(1500);
    
    //todo похоже, что ф-ции 1-6 - одинаковые. Их можно объединить. На будущее, не сейчас.
    function slideMove0() {

        moveRocket(0);

        if (document.querySelector('#bezierLine') && document.querySelector(".number").innerHTML == 0) {
            document.querySelector('#bezierLine').remove();
        } else {
            var timer = setTimeout(function () {
                if (document.querySelector('#bezierLine')) {
                    document.querySelector('#bezierLine').remove();
                    clearTimeout(timer);
                }
            }, 750);
        }

        $scope.userSkills = userSkillsData[0]; //fake data trigger

        graphsBuilder(0);

        leftNav.style.display = 'none';

        showSlide(0);
        showDots(0);

        addLessonData(null);

        clearPulsation();
        data.next_object_data.next_lesson.lesson_type = "5";

        goToNextSlide(2500);
    }
    
    function slideMove1() {

        moveRocket(0);

        $scope.userSkills = userSkillsData[1]; //fake data trigger

        graphsBuilder(1);

        leftNav.style.display = 'block';

        showSlide(1);
        showDots(0);

        addLessonData(null);

        clearPulsation();
        data.next_object_data.next_lesson.lesson_type = "5";
        setTimeout(function() {
            addPulsation(document.querySelector('.lesson > svg.icon'),
                document.querySelector('.lesson > svg.iconBack'),
                document.querySelector('.lessonType'))
        }, 10);
        
        goToNextSlide(2500);
    }

    function slideMove2() {

        moveRocket(25);

        graphOpacity(0);

        graphsBuilder(2);

        leftNav.style.display = 'block';

        showSlide(2);
        showDots(1);

        $scope.userSkills = userSkillsData[2];

        addLessonData(6, ["5"]);
        
        clearPulsation();
        $scope.$apply();
        firstCircle = document.querySelector('.circles');
        firstCircle.classList.remove('demoCircles');
        data.next_object_data.next_lesson.lesson_type = "2";
        setTimeout(function() {
            addPulsation(document.querySelector('.circles'))
        }, 10);
        
        goToNextSlide(5000);
    }

    function slideMove3() {

        moveRocket(50);

        graphOpacity(1);

        graphsBuilder(3);

        leftNav.style.display = 'block';

        showSlide(3);
        showDots(2);

        $scope.userSkills = userSkillsData[3];

        addLessonData(5,["5", "2"]);

        clearPulsation();

        data.next_object_data.next_lesson.lesson_type = "3";

        if (firstCircle) firstCircle.classList.add('demoCircles');
        document.querySelector('.area_1').classList.add('wavesPulse1');
        document.querySelector('.area_2').classList.add('wavesPulse2');

        goToNextSlide(5000);
    }

    function slideMove4() {

        moveRocket(50);

        graphOpacity(1);

        graphsBuilder(4);

        leftNav.style.display = 'block';

        showSlide(4);
        showDots(2);

        $scope.userSkills = userSkillsData[4];

        addLessonData(5,["5", "2"]);

        clearPulsation();

        data.next_object_data.next_lesson.lesson_type = "3";
        
        if (firstCircle) firstCircle.classList.add('demoCircles');
        document.querySelectorAll('.skills .grammar div')[0].classList.add('skillsPulse1');
        document.querySelectorAll('.skills .grammar div')[1].classList.add('skillsPulse1');
        document.querySelectorAll('.skills .lexis div')[0].classList.add('skillsPulse2');
        document.querySelectorAll('.skills .lexis div')[1].classList.add('skillsPulse2');
        document.querySelectorAll('.skills .listening div')[0].classList.add('skillsPulse3');
        document.querySelectorAll('.skills .listening div')[1].classList.add('skillsPulse3');

        goToNextSlide(5000);
    }

    function slideMove5() {

        moveRocket(75);

        graphOpacity(2);

        graphsBuilder(5);

        leftNav.style.display = 'block';

        showSlide(5);
        showDots(3);

        $scope.userSkills = userSkillsData[5];

        addLessonData(4, ["5", "2", "3"]);

        clearPulsation();
        document.querySelector('#discountIcon').parentElement.classList.add('pulse');

        data.next_object_data.next_lesson.lesson_type = "4";

        if (firstCircle) firstCircle.classList.add('demoCircles');
        goToNextSlide(5000);
    }

    function slideMove6() {

        moveRocket(100);

        graphOpacity(2);

        graphsBuilder(6);

        leftNav.style.display = 'block';

        showSlide(6);
        showDots(4);

        $scope.userSkills = userSkillsData[6];

        addLessonData(0, ["5", "2", "3", "4", "5", "2", "7"]);

        clearPulsation();
        document.querySelector('#discountIcon').parentElement.classList.add('pulse');

        data.next_object_data.next_lesson.lesson_type = "5";

        if (firstCircle) firstCircle.classList.add('demoCircles');
        goToNextSlide(5000);
    }

    function slideMove7() {

        moveRocket(0);

        setTimeout(function () {
            if (document.querySelector('#bezierLine')) {
                document.querySelector('#bezierLine').remove();
            }
        }, 1000);

        $scope.userSkills = userSkillsData[7]; //fake data trigger

        graphsBuilder(7);

        compareUrl(pos = 0);
        showSlide(7);
        
        finished = true;

        leftNav.style.display = 'none';
        rightNav.style.display = 'none';
        dotsContainer.style.display = 'none';
        document.querySelector('.skipButton').querySelector('button').style.display = 'none';

        document.querySelector('.slider_container').style.justifyContent = 'center';
        setTimeout(function () {
            location.href = location.href.match(/\/[a-z]{2}\//)[0];
        }, 750);

        clearPulsation();
        if (firstCircle) firstCircle.classList.add('demoCircles');
        
        clearTimeout(timeSlider);
    }

    var objSlidesMethods = {
        0: slideMove0,
        1: slideMove1,
        2: slideMove1,
        3: slideMove1,
        4: slideMove1,
        5: slideMove2,
        6: slideMove3,
        7: slideMove4,
        8: slideMove5,
        9: slideMove6,
        10: slideMove7
    };

    document.querySelectorAll('.navigation').forEach(function (element) {
        element.addEventListener('click', function () {
            if (element.classList.contains('dots')) {
                pos = +this.getAttribute('data-index');
                compareUrl(pos);
                objSlidesMethods[pos]();
            } else {
                pos = pos + +this.getAttribute('data-index');
                compareUrl(pos);
                objSlidesMethods[pos]();
            }
        });
    });

    document.querySelector('.skipButton').querySelector('button')
        .addEventListener('click', slideMove7, false);

    document.addEventListener('keydown', function(event) {

        if (finished) return;

        var keycode;
        if (event.keyCode) {
            keycode = event.keyCode;
        }
        else if(event.which) {
            keycode = event.which;
        }
        if (keycode === 37) {
            if (pos) {
                pos--;
            }
            compareUrl(pos);
            objSlidesMethods[pos]();
        } else if (keycode === 39) {
            if (pos < 10) {
                pos++;
            }
            compareUrl(pos);
            objSlidesMethods[pos]();
        }
    }, false);
    
    function nextSlide() {
        pos++;
        compareUrl(pos);
        objSlidesMethods[pos]();
    }

    function goToNextSlide(time) {
        clearTimeout(timeSlider);
        timeSlider = setTimeout(nextSlide, time);
    }

    /**
     * Mail animation
     */

    function rotateLetter() {
        var contactInfo = document.querySelector('.contactInfo'),
            letter = document.querySelector('.letter'),
            social = document.querySelector('.socialNetworks');

        function changeState() {
            contactInfo.classList.toggle('open');
            social && social.classList.toggle('close');
        }

        letter.addEventListener('click', changeState);
    }

    rotateLetter();

    $scope.comeBack = function(){return 0;};
}]);
