// скролл по ссылкам <a> <--> <a>
// $(document).ready(function() {
// 	$('a[href*=#]').bind("click", function(e){
// 		var anchor = $(this);
// 			var name = anchor.attr('href').replace(new RegExp("#",'gi'), "");
// 				$('html, body').stop().animate({
// 					scrollTop: $('a[name='+name+']').offset().top
// 				}, 1000);
// 			e.preventDefault();
// 		return false;
// 	});
// });

$(document).ready(function(){
	// Плавный скролл по якорям id
	$('a[href^="#"]').click(function () { 
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		if($.browser.safari){
			$('body').animate( { scrollTop: destination }, 1000 );
			} else {
		$('html').animate( { scrollTop: destination }, 1000 );}
		return false;
	});
});

$(document).ready(function(){
	$('button').on("click",function (){
		$('.main-nav').addClass("toggle").slideToggle(800);
	});});

$(window).on('load resize',windowSize);

function windowSize(){
	if ($(window).width() > '768') {
		$('.main-nav').css("display","block");
			} else {
				$('.main-nav').css("display","");
			}}
	

	