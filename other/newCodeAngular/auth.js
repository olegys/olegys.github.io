(function auth() {
	//add forEach method to NodeList
	NodeList.prototype.forEach = Array.prototype.forEach;

    var languagesList = document.querySelectorAll('.langList'),
        currentLanguage = document.querySelector('.current'),
        languageArrows = document.querySelector('.languagesArrow'),
        hiddenMsg;

    function showLanguages() {

        var topOffset,
            dTop;

        currentLanguage.classList.add('open');
        dTop = currentLanguage.offsetWidth === 38 ? 68 : 45;
        topOffset = dTop;

        languageArrows.style.cssText = 'opacity: 1';

        for (var i = 0, l = languagesList.length; i < l; i++) {
            languagesList[i].style.cssText = 'top: ' + topOffset + 'px; opacity: 1;';
            topOffset += dTop;
        }
    }

    function hideLanguages() {

        currentLanguage.classList.remove('open');

        languageArrows.style.cssText = 'opacity: 0';

        for (var i = 0, l = languagesList.length; i < l; i++) {
            languagesList[i].style.cssText = 'top: 0; opacity: 0;';
        }
    }

    function manageLanguages() {
        if (currentLanguage.classList.contains('open')) {
            hideLanguages();
        } else {
            showLanguages();
        }
    }

    currentLanguage.addEventListener('click', manageLanguages);

	/**
	 * Close overlay login
	 */

	document.querySelectorAll('._closePopup').forEach(function (el) {
		el.addEventListener('click', closeOverlay);
	});

	function closeOverlay() {
		document.querySelector(".popup").classList.toggle("hidden");
	}

    hiddenMsg = document.querySelectorAll('._authMsg');

    document.querySelectorAll('._authForm').forEach(function (el) {
        el.addEventListener('submit', sendAuth, false);
    });

    function transformData(data) {
        var transformedData = '';
        for (var key in data) {
            transformedData += key + '=' + data[key] + '&';
        }
        return transformedData.slice(0, transformedData.length - 1);
    }

    /**
     * Function for auth requests
     * @param e - event object
     */
    function sendAuth(e) {
        
        var type,
            data,
            self,
            valid = true;

        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();

        self = this;

        if (!checkEmail()) {
            valid = false;
        }
        if (self.querySelector('._authInputPassword') && !checkPassword()) {
            valid = false;
        }

        if (!valid) {
            return;
        }

        data = new Data();
        type = self.getAttribute('data-type');
        hiddenMsg.forEach(function (el) {
            !el.classList.contains('hidden') && el.classList.add('hidden');
        });

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/' + location.href.split('/')[3] + '/' + type + '/', true);

        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.send(transformData(data));

        xhr.onload = function () {

            if (this.readyState !== 4 || this.status !== 200) return false;

            if (JSON.parse(this.responseText)[0]) {
                location.href = location.href + 'demo';
            } else if (JSON.parse(this.responseText) instanceof Array) {
                location.href = '/';
                return;
            }

            showMessages(JSON.parse(this.responseText));

            document.querySelectorAll('._reSend').forEach(function (el) {
                el.addEventListener('click', function () {
                    resendEmail(data);
                }, false);
            });
        };

        function Data() {
            this.email = self.querySelector('._authInputEmail').value;
            if (type !== 'forgotpassword') {
                this.method = 'processAction';
                this.isPopUp = false;
            }
            if (self.querySelector('._authInputPassword')) {
                this.password = self.querySelector('._authInputPassword').value;
                this.isPopUp = true;
            }
            if (self.querySelector('._authInputConfirmPassword')) {
                this.confirm_password = self.querySelector('._authInputConfirmPassword').value;
            }
        }

        function showMessages(d) {
            var msg, key;

            document.querySelectorAll('._changeEmail').forEach(function (el) {
                el.innerHTML = data.email;
            });

            if (d.registration) {

                document.querySelector('.loginForm').classList.add('hidden');

                document.querySelector('.userEmail').innerHTML = data.email;

                document.querySelector('._regMessage').classList.remove('hidden');
                document.querySelectorAll('._inputTabs').forEach(function (el) {
                    el.classList.add('hidden');
                });
            } else if (d.forgotpassword) {
                document.querySelector('.password_recovery').classList.add('hidden');
                document.querySelector('._sentRecoveryMessage').classList.remove('hidden');
                document.querySelector('._sentRecoveryMessage').querySelector('.email').innerHTML = data.email;
            }

            for (key in d) {
                msg = self.querySelector('._authMsg_' + key);
                if (msg && msg.classList.contains('_authMsg_message')) {
                    errorTimer();
                }
                if (msg) {
                    msg.classList.remove('hidden');
                    msg.children[0].innerHTML = d[key];
                }
            }
        }

        function resendEmail(data) {
            var resButton;
            resButton = document.querySelectorAll('._reSend');
            resButton.forEach(function (item) {
                item.style.transition = '1s';
                item.style.transform = 'rotate(360deg)';
            });
            setTimeout(function () {
                resButton.forEach(function (item) {
                    item.style.transition = '0s';
                    item.style.transform = 'rotate(0deg)';
                });
            }, 1000);

            var xhr = new XMLHttpRequest();

            xhr.open('POST', '/' + location.href.split('/')[3] + '/' + type + '/', true);

            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.send(transformData({method: 'sendmailagain', email: data.email}));
        }

        function errorTimer() {
            var timer, button, counter, interval, seconds;
            timer = self.querySelector('._timer');
            button = self.querySelector('._sub');
            interval = 1000;
            seconds = 10;
            if (timer) {
                button.setAttribute('disabled', 'disabled');
                counter = setInterval(function () {
                    if (seconds > 0) {
                        timer.innerHTML = '00:' + (seconds <= 10 ? '0' + --seconds : --seconds);
                    } else {
                        clearInterval(counter);
                        timer.innerHTML = '';
                        hiddenMsg.forEach(function (el) {
                            !el.classList.contains('hidden') && el.classList.add('hidden');
                        });
                        button.removeAttribute('disabled');
                    }
                }, interval);
            }
        }
    }
})();
