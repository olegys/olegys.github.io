swiping("swipe");

function swiping(element) {
	var position = 0;
	var startX = 0,
		startY = 0,
		newX = 0,
		newY = 0,
		minX = 50,
		maxY = 150,
		direction = "",
		move = false;

	var selector = document.getElementById(element);

	selector.addEventListener('touchstart', function (e) {
		var touch = e.touches[0];
		startX = touch.screenX;
		startY = touch.screenY;
		move = false;

		toTranslateStart();
	});

	selector.addEventListener('touchmove', function (e) {
		var touch = e.touches[0];
		newX = touch.screenX;
		newY = touch.screenY;
		move = true;

		toTranslateMove();

	});

	selector.addEventListener('touchend', function () {
		if (!move) {
			return false;
		}

		if ((((newX - minX > startX) || (newX + minX < startX)) && ((newY < startY + maxY) && (startY > newY - maxY)))) {
			direction = newX > startX ? "left" : "right";
		}

		if (direction !== "") {
			moveTo(selector, direction);
		}
			toTranslate();


		direction = "";
	});

	document.querySelector("#lastSlide") && document.querySelector("#lastSlide").addEventListener("touchstart", showLastSlide);

	document.querySelector('.select-language').addEventListener('touchstart', function () {
		document.querySelector('.language-list').classList.toggle('hidden');
	}, false);

	for (var i = 0; i < document.querySelectorAll(".active-fields").length; i++) {
		document.querySelectorAll(".active-fields")[i].addEventListener("touchstart", function (e) {
			e.stopPropagation();
		});
	}

	document.querySelector(".overlay").addEventListener("touchstart", navToggle, false);

	document.querySelector('.nav-menu').addEventListener('touchstart', navToggle, false);

	document.querySelector('body').addEventListener('touchstart', function () {
		document.querySelector('.language-list').classList.add('hidden');
	}, false);

	document.forms.registration && document.forms.registration.addEventListener("submit", function (e) {
		var email, url;
		e.preventDefault();
		email = document.querySelector(".sign-up__email").value;
		url = "../registration/";

		document.querySelector(".sign-up__not-error").classList.remove("sign-up__error");

		if (!e.currentTarget.email.validity.valid) {
			document.querySelector(".sign-up__not-error").classList.add("sign-up__error");
			return false;
		}

		sendAjax({"email": email, "method": "processAction", "isPopUp": false}, url);
	});

	function showLastSlide() {
		navToggle();
		document.querySelector("#swipe").style.display = "block";
		document.querySelector(".navigation").style.display = "block";
		document.querySelector(".registration").classList.add("hidden");
		document.querySelector(".swipe__page-info").classList.remove("hidden");
		document.querySelector(".swipe__page-submit-info").classList.add("hidden");

		var slides = document.querySelectorAll(".swipe__page:not(.registration)");
		for (var i = 0; i < slides.length; i++){
			if (slides[i].classList.contains("swipe__page_center")) {
				slides[i].classList.remove("swipe__page_center");
				slides[i].classList.add("swipe__page_left");
			} else {
				slides[i].classList.remove("swipe__page_right");
				slides[i].classList.add("swipe__page_left");
			}
		}
		slides[slides.length - 1].classList.add("swipe__page_center");
		position = slides.length - 1;
		moveTo(document.querySelector("#swipe"));
	}

	function moveTo(element, direction) {

		var navigation = document.querySelectorAll(".navigation .navigation__dots");
		if (direction == 'left') {
			if (position > 0) {
				position--;
			} else {
				return false;
			}

			element.children[position].nextElementSibling.classList.remove('swipe__page_center');
			element.children[position].nextElementSibling.classList.add('swipe__page_right');

		} else if (direction == 'right') {
			if (position < element.children.length - 1) {
				position++;
			} else {
				return false;
			}

			element.children[position].previousElementSibling.classList.remove('swipe__page_center');
			element.children[position].previousElementSibling.classList.add('swipe__page_left');
		}

		element.children[position].classList.remove('swipe__page_' + direction);
		element.children[position].classList.add('swipe__page_center');

		for (var i = 0; i < navigation.length; i++) {
			if (navigation[i].classList.contains("navigation__dots-active")) {
				navigation[i].classList.remove("navigation__dots-active");
				navigation[i].style.background = "";
			}
		}
		toTranslateStart();
		toTranslate();

		navigation[position].classList.add("navigation__dots-active");
		document.querySelector('body').className = "swipe__colors_" + position;
	}

	function navToggle() {
		document.querySelector('.overlay').classList.toggle('hidden');
		document.querySelector("._nav").classList.toggle("rotate-nav");
		if (!document.querySelector('.registration') || document.querySelector('.registration').classList.contains("hidden")) {
			document.querySelector('#swipe').classList.toggle("blur-filter");
		} else {
			document.querySelector('.registration').classList.toggle("blur-filter");
		}
	}

	function sendAjax(data, url) {
		$.ajax({
			type: "POST",
			url: url,
			dataType: "json",
			data: data,
			success: function (e) {
				if (e.registration) {
					var registration = document.querySelector('.registration');
					var pageInfoSub = document.querySelector(".swipe__page-submit-info");
					var pageInfo = document.querySelector(".swipe__page-info");

					document.querySelector("#swipe").style.display = "none";
					document.querySelector(".navigation").style.display = "none";
					document.querySelector("body").className = "swipe__colors_7";

					pageInfoSub.classList.remove("hidden");
					pageInfo.classList.add("hidden");

					registration.classList.remove("swipe__page_right", "hidden");
					registration.classList.add('swipe__page_center');

					document.querySelector(".sign-up__not-error").classList.remove("sign-up__error");
					document.querySelector(".submit-info__email").innerHTML = data.email;

					return true;
				}

				document.querySelector(".sign-up__not-error").classList.add("sign-up__error");
				document.querySelector(".sign-up__not-error").innerHTML = e.email || e.message;
			},
			error: function () {
				document.querySelector(".sign-up__not-error").classList.add("sign-up__error");
				document.querySelector(".sign-up__not-error").innerHTML = "Server Error";
			}
		});
	}

	function toTranslateStart() {
		for (var i = 0; i < document.querySelectorAll(".swipe__page").length; i++) {
			document.querySelectorAll(".swipe__page")[i].style.transform = "";
			document.querySelectorAll(".swipe__page")[i].classList.remove("swipe__page_animation");
		}
	}
	
	function toTranslate() {
				document.querySelector(".swipe__page_center").style.transform = "";
				document.querySelector(".swipe__page_center").classList.add("swipe__page_animation");
			if (document.querySelector(".swipe__page_center").nextElementSibling) {
				document.querySelector(".swipe__page_center").nextElementSibling.style.transform = "";
				document.querySelector(".swipe__page_center").nextElementSibling.classList.add("swipe__page_animation");
			}
			if (document.querySelector(".swipe__page_center").previousElementSibling) {
				document.querySelector(".swipe__page_center").previousElementSibling.style.transform = "";
				document.querySelector(".swipe__page_center").previousElementSibling.classList.add("swipe__page_animation");
			}
		}

	function toTranslateMove() {
		var width = document.querySelector(".swipe__page_center").clientWidth;
		var resist = 1;

		if ((position > 0 || position < document.querySelector("#swipe").children.length - 1)) {
			if (!document.querySelector(".swipe__page_center").previousElementSibling && -(startX - newX) > 0 || !document.querySelector(".swipe__page_center").nextElementSibling && -(startX - newX) < 0){
				resist = 10;
			}

			document.querySelector(".swipe__page_center").style.transform = "translate3d(" + (-(startX - newX)) / width * 100 / resist + "%, 0, 0)";

			if (document.querySelector(".swipe__page_center").nextElementSibling) {
				document.querySelector(".swipe__page_center").nextElementSibling.style.transform = "translate3d(" + (100 - (startX - newX) / width * 100) + "%, 0, 0)";
			}
			if (document.querySelector(".swipe__page_center").previousElementSibling) {
				document.querySelector(".swipe__page_center").previousElementSibling.style.transform = "translate3d(" + (-100 - (startX - newX) / width * 100) + "%, 0, 0)";
			}
		}

	}
}
	
