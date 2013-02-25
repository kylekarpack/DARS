$(window).load(function() {
	
	// Simple calendar
	$("#cal").datepicker();
	
	// navigation higlighting
	$("body").scrollspy();
	$(".nav-list li").removeClass("active");
	
	//had to rewrite accordion to iron out bugs and use without markup
	$("h1.page-header").click(function() {
		var content = $($(this).siblings()[0]);
		if (content.css("display") == "none") {
			content.slideDown();
			$(this).children().removeClass("icon-chevron-down").addClass("icon-chevron-up");
		} else {
			content.slideUp();
			$(this).children().removeClass("icon-chevron-up").addClass("icon-chevron-down");
		}
	});
	
	// Navigation
	$(".nav-list a").click(function() {
		var sel = $(this).attr("data-target");
		var newTop = $($(this).attr("data-target")).offset().top;
		var oldTop = $(this).offset().top;
		$('body').animate({
			 scrollTop: newTop
		 }, Math.abs(newTop-oldTop), function() { // make sure selected one is showing
				$(sel + " .box-content").slideDown()
			})
	});
	
	// Introductory scrolling
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
	
	// "Login"
	$('button[type="button"]').click(function() {
		var name = $("#inputEmail")[0].value;
		$(".dropdown-menu").slideUp();
		$(".alert").slideDown();
		$(".dropdown-toggle").text("Hi, " + name + "!");
		document.title = name + "'s DARS";
	});

});