/* on DOM-ready, set up scroll behavior and load current year */
$(document).ready(function() {
    scrollToAnchor();
    selectOnScroll();
    loadPhotos();
    loadYear();
});


/* make same-page anchor links scroll to section instead of jump */
function scrollToAnchor(){
	$('a[href^="#"]').each(function() {
	    var id = $(this).attr('href');
	    $(this).click(function(e) {
	        e.preventDefault();
            $('html,body').animate({scrollTop: $(id).offset().top+1},'slow');
        });
    });
}

/* select the appropriate navbar item on scroll */
function selectOnScroll() {
    $('#nav-menu li a').each(function() {
        var id = $(this).attr('href');
        $(id).waypoint(function(direction) {
            if (direction === "down") {
                $('#nav-menu li.selected').removeClass('selected');
                $('#nav-menu li a[href="' + id +'"]').parent()
                                                     .addClass('selected');
            }
            else if (direction === "up" && id !== "#home") {
                $('#nav-menu li.selected').removeClass('selected');
                $('#nav-menu li a[href="' + id +'"]').parent().prev()
                                                     .addClass('selected');
            }
        });
    });
}

/* set up photo galleries */
function loadPhotos() {
    $("#bridge .section-photos .displayImage").gallery({
        source: "#bridge .section-photos img"
    });
    $("#bridge .section-photos .displayImage").on({
        mouseenter: function() {
            $("#bridge .section-photos .displayImage").gallery("stopAnimation");
        },
        mouseleave: function() {
            $("#bridge .section-photos .displayImage").gallery("resumeAnimation");
        }
    });
}

/* load current year into .year tags */
function loadYear() {
    var date = new Date();
    $('.year').text(date.getFullYear());
}