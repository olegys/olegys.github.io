// for safari add forEach method to NodeList
NodeList.prototype.forEach = Array.prototype.forEach;

;(function intro() {
	let currentIndex = 0,
		timeout,
		hiddenMsg,
		auth,
		dataIndexItems = document.querySelectorAll('[data-index]');

	setSlide(currentIndex);

	window.addEventListener('keydown', changeSlide);
	window.addEventListener('wheel', changeSlide);

	// for buttom read more button. Got to 1st slide
	document.querySelector('.readMore').addEventListener('click', () => setSlide(++currentIndex));

	// for logo. Go to zero slide
	document.querySelector('.image').addEventListener('click', () => setSlide(0));

	// 6th slide. Go to slide 5
	document.querySelector('.backToSlides').addEventListener('click', () => setSlide(--currentIndex));

	/**
	 * Changes slide by key or wheel
	 * keyCodes
	 * 32 - space
	 * 38 - arrow top
	 * 40 - arrow down
	 * @param e {object}
	 */
	function changeSlide(e) {
		if (e.keyCode === 40 || e.keyCode === 38) e.preventDefault();
		if (e.keyCode === 37 || e.keyCode === 39) e.preventDefault();

		if (timeout || (e.deltaY && Math.abs(e.deltaY) < 7 || Math.abs(e.wheelDelta)) < 60) return;
		e.stopPropagation();

		timeout = setTimeout(function () {
			timeout = null;
		}, 700);

		if ((e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 32 || (e.wheelDelta && e.wheelDelta <= -60) || e.deltaY >= 7) && currentIndex < 6) {
			setSlide(++currentIndex);
		} else if ((e.keyCode === 38 || e.keyCode === 37 || (e.wheelDelta && e.wheelDelta >= 60) || e.deltaY <= -7) && currentIndex > 0) {
			setSlide(--currentIndex);
		}

		if(currentIndex === 6) document.querySelector("div[data-index='6'] ._authMsg_email").classList.add('hidden');
	}

	/**
	 * Changes slide by clicking on navigation icons
	 * @param index {number}
	 */
	function setSlide(index) {
		document.body.setAttribute('data-index', index.toString());
		currentIndex = index;
		for (var i = 0, l = dataIndexItems.length; i < l; i++) {
			if (+dataIndexItems[i].getAttribute('data-index') === index) {
				dataIndexItems[i].classList.add('active');
			} else {
				dataIndexItems[i].classList.remove('active');
			}
		}

		// show arrow back to slides
		if (index === 6) {
			setTimeout(function () {
				document.querySelector('.backToSlides').classList.add('show');
			}, 1500)
		} else {
			document.querySelector('.backToSlides').classList.remove('show');
		}
	}

	// for menu items
	function menuItems() {
		var menuItems = document.querySelectorAll('.menuItem');

		for (var i = 0, l = menuItems.length; i < l; i++) {
			menuItems[i].addEventListener('click', function (e) {
				currentIndex = +e.currentTarget.getAttribute('data-index');
				document.body.setAttribute('data-index', currentIndex.toString());
				e.currentTarget.classList.add('active');
				setSlide(currentIndex);
			});
		}
	}

	// rotate letter & show contact info
	function rotateLetter() {
		var contactInfo = document.querySelector('.contactInfo'),
			letter = document.querySelector('.letter');

		function changeState() {
			contactInfo.classList.toggle('open');
		}

		letter.addEventListener('click', changeState);
	}

	// change languages
	function changeLanguages() {
		var languagesList = document.querySelectorAll('.languagesList'),
			currentLanguage = document.querySelector('.currentLanguage');

		function showLanguages(e) {
			var topOffset = 59;
			currentLanguage.classList.add('open');

			for (var i = 0, l = languagesList.length; i < l; i++) {
				languagesList[i].style.cssText = 'top: ' + topOffset + 'px; opacity: 1;';
				topOffset += 59;
			}

			e.stopPropagation();
			document.body.addEventListener('click', hideLanguages);
		}

		function hideLanguages() {
			currentLanguage.classList.remove('open');

			for (var i = 0, l = languagesList.length; i < l; i++) {
				languagesList[i].style.cssText = 'top: 0; opacity: 0;';
			}

			document.body.removeEventListener('click', hideLanguages);
		}

		function manageLanguages(e) {
			if (currentLanguage.classList.contains('open')) {
				hideLanguages();
			} else {
				showLanguages(e);
			}
		}

		currentLanguage.addEventListener('click', manageLanguages);
	}

	menuItems();
	rotateLetter();
	changeLanguages();

	hiddenMsg = document.querySelectorAll('._authMsg');
	auth = document.querySelector('._auth');

	document.querySelectorAll('._togglePopup').forEach(function (el) {
		el.addEventListener('click', togglePopUp, false);
	});
	document.querySelectorAll('._authTab').forEach(function (el) {
		el.addEventListener('click', function () {
			activeAuthTab(this);
		}, false)
	});
	document.querySelectorAll('._authForm').forEach(function (el) {
		el.addEventListener('submit', sendAuth, false);
	});
	document.querySelector('._restorePass').addEventListener('click', restorePass, false);

	/**
	 * Opens or closes pop-up
	 */
	function togglePopUp() {
		if (this.classList.contains('_close')) {
			auth.classList.add('hiddenAnimate');
			auth.querySelector('.forms').classList.remove('animate');
		} else {
			auth.classList.remove('hiddenAnimate');
			auth.querySelector('.forms').classList.add('animate');
		}
		document.querySelector('._openPass').classList.add('hidden');
		document.querySelector('._regMessage').classList.add('hidden');
		document.querySelector('._recoveryMessage').classList.add('hidden');
		document.querySelector('._reg').classList.remove('hidden');
		document.querySelector('._login').classList.remove('hidden');
		if (auth.classList.contains('hiddenAnimate')) {
			window.addEventListener('keydown', changeSlide);
			window.addEventListener('wheel', changeSlide);
		} else {
			window.removeEventListener('keydown', changeSlide);
			window.removeEventListener('wheel', changeSlide);
		}

		activeAuthTab(this);
	}

	/**
	 * Check which auth tab (sign in or log in) has been clicked
	 * @param t {object}
	 */
	function activeAuthTab(t) {
		var target = t.classList.contains('_openLogin') ? '._login' : '._reg';

		if (!t.classList.contains('_close')) {
			document.querySelector('._auth .active') && document.querySelector('._auth .active').classList.remove('active');
			document.querySelector(target).classList.add('active');
			document.querySelector(target + ' ._sub').hasAttribute('disabled') && document.querySelector(target + ' ._authMsg_message').classList.remove('hidden');
			document.querySelector((t.classList.contains('_openReg') ? '._login' : '._reg') + ' ._authMsg_message').classList.add('hidden');
		}

		if (t.classList.contains('_closeRestore')) {
			document.querySelector('._openPass').classList.add('hidden');
			document.querySelector('._reg').classList.remove('hidden');
		}

		hiddenMsg.forEach(function (el) {
			if (!el.classList.contains('hidden') && !el.classList.contains('_authMsg_message')) {
				el.classList.add('hidden');
			}
		});
	}

	/**
	 * Function for showing restore pass window
	 */
	function restorePass() {

		var el = document.querySelector('._openPass');
		document.querySelector('._reg').classList.add('hidden');

		document.querySelector('._auth .active') && document.querySelector('._auth .active').classList.remove('active');
		el.classList.add('active');
		el.classList.remove('hidden');
		hiddenMsg.forEach(function (el) {
			!el.classList.contains('hidden') && el.classList.add('hidden');
		});
	}

	/**
	 * Transforms authorization object to GET-like string. Is needed for xhr
	 * @param data {object} Credentials
	 * @return {string} GET-like string
	 */
	function transformData(data) {
		var transformedData = '';
		for (var key in data) {
			transformedData += key + '=' + data[key] + '&';
		}
		return transformedData.slice(0, transformedData.length - 1);
	}

	/**
	 * Function for auth requests
	 * @param e {object}
	 */
	function sendAuth(e) {
		var type,
			data,
			self,
			preloader,
			valid = true;
		e.preventDefault && e.preventDefault();
		e.stopPropagation && e.stopPropagation();
		
		self = this;

		if (!checkEmail(self)) {
			valid = false;
		}

		if (self.querySelector('._authInputPassword') && !checkPassword(self)) {
			valid = false;
		}

		if (!valid) {
			return;
		}

		data = new Data();
		type = self.getAttribute('data-type');
		preloader = document.querySelector('.loaderBox');
		hiddenMsg.forEach(function (el) {
			!el.classList.contains('hidden') && el.classList.add('hidden');
		});

		preloader.classList.add('fade', 'playAnimation');

		//todo вынести xhr в общую функцию
		var xhr = new XMLHttpRequest();

		xhr.open('POST', '/' + location.href.split('/')[3] + '/' + type + '/', true);

		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.send(transformData(data));

		xhr.onload = function () {

			preloader.classList.remove('fade', 'playAnimation');

			if (this.readyState != 4) return false;

			if (this.status != 200) {
				return false;
			}

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
					el.classList.add('rotate');
					setTimeout(function () {
						el.classList.remove('rotate');
					}, 1000)
				}, false);
			});
		};

		function Data() {
			this.email = self.querySelector('._authInputEmail').value;
			console.log(self.querySelector('._authInputEmail').value);
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

		/**
		 * Shows messages when user tries to log or sign in
		 * @param d {object} Response from server
		 */
		function showMessages(d) {
			var msg, key;

			document.querySelectorAll('._changeEmail').forEach(function (el) {
				el.innerHTML = data.email;
			});

			if (d.registration) {
				document.querySelectorAll('._regMessage').forEach(function (el) {
					el.classList.remove('hidden');
				});
				document.querySelectorAll('._inputTabs').forEach(function (el) {
					el.classList.add('hidden');
				});

			} else if (d.forgotpassword) {
				document.querySelector('._recoveryMessage').classList.add('active');
				document.querySelector('._recoveryMessage').classList.remove('hidden');
				document.querySelectorAll('._inputTabs').forEach(function (el) {
					el.classList.add('hidden');
				});
			}

			for (key in d) {
				msg = self.querySelector('._authMsg_' + key);
				if (msg && msg.classList.contains('_authMsg_message') && !(self.getAttribute('data-type') === 'login')) {
					errorTimer();
				}
				if (msg) {
					msg.classList.remove('hidden');
					msg.children[0].innerHTML = d[key];
				}
			}
		}

		/**
		 * Re-sends email
		 * @param data {object}
		 */
		function resendEmail(data) {
			var xhr = new XMLHttpRequest();

			xhr.open('POST', '/' + location.href.split('/')[3] + '/' + type + '/', true);

			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			xhr.send(transformData({method: 'sendmailagain', email: data.email}));
		}

		function errorTimer() {
			var timer, button, counter, interval, seconds, inputs;
			timer = self.querySelector('._timer');
			button = self.querySelector('._sub');
			inputs = self.querySelectorAll('input');
			interval = 1000;
			seconds = 10;
			if (timer) {
				inputs.forEach(function (input) {
					input.setAttribute('disabled', 'disabled');
				});
				document.activeElement.blur();
				button.setAttribute('disabled', 'disabled');
				counter = setInterval(function () {
					if (seconds > 0) {
						timer.innerHTML = '00:' + (seconds <= 10 ? '0' + --seconds : --seconds);
					} else {
						clearInterval(counter);
						timer.innerHTML = '';
						self.querySelectorAll('._authMsg').forEach(function (el) {
							!el.classList.contains('hidden') && el.classList.add('hidden');
						});
						inputs.forEach(function (input) {
							input.removeAttribute('disabled');
						});
						button.removeAttribute('disabled');
					}
				}, interval);
			}
		}
	}
})();