import * as appFunctions from "./modules/functions.js";
import * as jQueryFunc from "./modules/jQuery.js";

jQueryFunc.jQuery();
appFunctions.isWebP;

$(function() {

    var link = $('#nav-bar a.nav-bar__link');
    var navBar = $('#nav-bar');

    // Move to specific section when click on menu link
    link.on('click', function(e) {
        var target = $($(this).attr('href'));
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 600);
        $(this).addClass('active');
        e.preventDefault();
    });

    // Run the scrNav when scroll
    $(window).on('scroll', function(){
        scrNav();
    });

    // scrNav function
    // Change active dot according to the active section in the window
    function scrNav() {
        var sTop = $(window).scrollTop();
        $('section').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top-1,
                height = $(this).height();
            if(sTop >= offset && sTop < offset + height) {
                link.removeClass('active');
                $('#nav-bar').find('[data-scroll="' + id + '"]').addClass('active');
                var sectionColor = $(this).attr('class').split(' ')[2];
                if (sectionColor === 'white') {
                    navBar.removeClass('white');
                    navBar.addClass('black');
                }
                else if (sectionColor === 'black') {
                    navBar.removeClass('black');
                    navBar.addClass('white');
                }
            }
        });
    }
    scrNav();
});