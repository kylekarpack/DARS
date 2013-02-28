// This is a test prototype for HCDE 418
// We are resdesigning DARS to improve the User Experience
// This file specifies much of the user interaction
// Authored by Kyle Karpack & Group 1

var aboveHeight;

$(window).load(function() {
	
	$(".star").raty({ 
		number:10, 
		// Randomize the default star rating
		score:function() {
			var ret = Math.floor(Math.random()*11);
			return ret < 4 ? ret + 4: ret; // set a minimum of 4
		},
	});
	
	// Color the table rows based on GPA (heatmap-ish)
	$("#past table td:last-child").css({"background": function() {
			var sum = 0;
			for(var i = 0; i < $("#past table td:last-child").length; i++) {
				sum += parseFloat($($("#past table td:last-child")[i]).text());
			}
			var avg = sum / $("#past table td:last-child").length;
			var a = parseFloat($(this).text());
			var color = a < avg ? "255,0,0" : "0,0,255";
			a = Math.abs(a - avg);
			
			return "rgba(" + color + "," + a + ")";
		}
	});
	
	// Popovers
	$(".label-success").popover({
		"trigger":"click",
		"html":"true",
		"content":"This is a class about the foundations of HCI. <br> <b>It is required for your graduation.</b><br><a> Register now</a>",
		"title":"HCDE",
		
	});
	
	// Simple calendar
	$("#cal").datepicker();
	
	// navigation higlighting
	$("body").scrollspy();
	$(".nav-list li").removeClass("active");
	
	//had to rewrite accordion to iron out bugs and use without markup
	$("section h1.page-header").click(function() {
		var content = $($(this).siblings()[0]);
		if (content.css("display") == "none") {
			content.slideDown();
			$(this).removeClass("h1up").children().removeClass("icon-chevron-down icon-white").addClass("icon-chevron-up");
		} else {
			content.slideUp(function() { aboveHeight = $('.sidebar').offset().top });
			$(this).addClass("h1up").children().removeClass("icon-chevron-up").addClass("icon-chevron-down icon-white");
		}
	});
	
	$(".advising .btn-primary").click(function() {
		$(this).datepicker();
	});
	
	// Navigation
	$(".nav-list a, .hero-unit a").click(function() {
		var sel = $(this).attr("data-target"); // get target
		$(sel + " h1").removeClass("h1up").children().removeClass("icon-chevron-down icon-white").addClass("icon-chevron-up");;
		var newTop = $(sel).offset().top; // target's top offset
		var oldTop = $(window).scrollTop(); // current offset
		var speed = sel === "#container" ? 1000 : Math.abs(newTop-oldTop); //introductory or general?

		$('body').animate({
			 scrollTop: newTop
		 }, speed, "easeInOutCubic", function() { // make sure selected one is showing
				$(sel + " .box-content").slideDown();
				
			})
	});
	
	 
	// Pinned nav
	aboveHeight = $('.sidebar').offset().top;

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