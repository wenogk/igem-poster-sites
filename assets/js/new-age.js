(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

    function getResponsiveBreakpoint() {
    var envs = ["xs", "sm", "md", "lg"];
    var env = "";

    var $el = $("<div>");
    $el.appendTo($("body"));

    for (var i = envs.length - 1; i >= 0; i--) {
        env = envs[i];
        $el.addClass("d-" + env + "-none");;
        if ($el.is(":hidden")) {
            break; // env detected
        }
    }
    $el.remove();
    return env;
}
  // Collapse Navbar
  var navbarCollapse = function() {
      let screenSize = getResponsiveBreakpoint();
    if ($("#mainNav").offset().top > 100) {
        
      $("#mainNav").addClass("navbar-shrink");
    if((screenSize!="xs")&&(screenSize!="sm")) {
    $("#logo-src").attr("src","assets/img/T--NYU_Abu_Dhabi--logoBlack.png");
    } else {
            $("#logo-src").attr("src","assets/img/T--NYU_Abu_Dhabi--logoBlack.png");
    }
              
    } else {
      $("#mainNav").removeClass("navbar-shrink");
        if((screenSize!="xs")&&(screenSize!="sm")) {
     $("#logo-src").attr("src","assets/img/volatect-logo.png");
        } else {
            $("#logo-src").attr("src","assets/img/T--NYU_Abu_Dhabi--logoBlack.png");
    }
   
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
