var NUM_THEMES = 4;
var theme = 0;

var NUM_SVG = 3;
var svg = 0;

$(function() {

    if (
        (
            navigator.userAgent.indexOf('Safari') != -1
            && navigator.userAgent.indexOf('Chrome') == -1
        )
        ||
        navigator.userAgent.indexOf('iPhone') != -1
        ||
        navigator.userAgent.indexOf('iPad') != -1
        ||
        navigator.userAgent.indexOf('iPod') != -1
    ) {
        $('body').addClass('ios');
    }

    $("body").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            console.log("You swiped " + direction );  
            switch (direction) {
                case 'up':
                    toggle_theme('plus');
                    break;
                case 'down':
                    toggle_theme('minus');
                    break;
                case 'right':
                    toggle_svg('minus');
                    break;
                case 'left':
                    toggle_svg('plus');
                    break;
            }
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:25
    });
});

var toggle_theme = function(plus_or_minus) {
    $('body').removeClass('theme-'+theme);

    if (plus_or_minus == 'minus')
        theme--;
    else
        theme++;

    if (theme == -1)
        theme = NUM_THEMES - 1;
    else if (theme == NUM_THEMES)
        theme = 0;

    $('body').addClass('theme-'+theme);
}

var timeout = null;
var timeout_callback = null;

var toggle_svg = function(plus_or_minus) {

    var orig = '#svg-'+svg;

    if (timeout)
    {
        clearTimeout(timeout);
        timeout_callback();
    }
    timeout_callback = function() {
        $(orig).addClass('invisible');
    };
    timeout = setTimeout(timeout_callback, 500);

    if (plus_or_minus == 'minus')
    {
        $(orig).addClass('right');
        svg--;
    }
    else
    {
        $(orig).addClass('left');
        svg++;
    }

    if (svg == -1)
        svg = NUM_SVG - 1;
    else if (svg == NUM_SVG)
        svg = 0;

    var cur = '#svg-'+svg;

    if (plus_or_minus == 'minus')
    {
        $(cur).removeClass('right');
        $(cur).addClass('left');
        $(cur).removeClass('invisible');
        setTimeout(function() {
            $(cur).removeClass('left');
        }, 10);
    }
    else
    {
        $(cur).removeClass('left');
        $(cur).addClass('right');
        $(cur).removeClass('invisible');
        setTimeout(function() {
            $(cur).removeClass('right');
        }, 10);
    }

    $('body').addClass('theme-'+theme);
}
