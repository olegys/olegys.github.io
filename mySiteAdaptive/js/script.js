$(document).ready(function() {
	$('a[href*=#]').bind("click", function(e){
		var anchor = $(this);
			var name = anchor.attr('href').replace(new RegExp("#",'gi'), "");
				$('html, body').stop().animate({
					scrollTop: $('a[name='+name+']').offset().top
				}, 1000);
			e.preventDefault();
		return false;
	});
});

