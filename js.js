$(window).load(function() {
	
	// Simple calendar
	$("#cal").datepicker();
	
	$("body").scrollspy();

	//had to rewrite accordion to iron out bugs and use without markup
	$("h1.page-header").click(function() {
		var content = $($(this).siblings()[0]);
		var height = content.height() + "px";
		if (content.css("display") == "none") {
			content.slideDown();
		} else {
			content.slideUp();
		}
	});
	
	$(".nav-list a").click(function() {
		var newTop = $($(this).attr("data-target")).offset().top;
		var oldTop = $(this).offset().top;
		$('body').animate({
			 scrollTop: newTop
		 }, (Math.abs(newTop-oldTop)))
	});

	$("#go").click(function() {
		 $('html, body').animate({
			 scrollTop: $("#container").offset().top - $(".navbar").outerHeight()
		 }, 1000);
	 });
	 
	// Pinned nav
	var calc1 = $('.hero-unit').outerHeight(true) + $(".navbar").outerHeight(),
		calc2 = $('.sidebar').offset().top;
	var aboveHeight = calc1 > calc2 ? calc1 : calc2;
 
	$(window).scroll(function(){
		
		// pin the sidebar
		if ($(window).scrollTop() > aboveHeight){
			$('.sidebar').addClass("fixed");
		} else {
			$('.sidebar').removeClass("fixed");
		}
		// roll up top nav
		if ($(window).scrollTop() > $(".hero-unit").outerHeight()) {
			$('.navbar').slideUp(function() { $(this).removeClass("navbar-fixed-top") });
		} else {
			$('.navbar').slideDown().addClass("navbar-fixed-top");
		}
	});
	
	$('button[type="button"]').click(function() {
		console.log("run");
		var name = $("#inputEmail")[0].value;
		$(".dropdown-menu").slideUp();
		$(".alert").slideDown();
		$(".dropdown-toggle").text("Hi, " + name + "!");
	});

});