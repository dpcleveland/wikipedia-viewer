// Expanding Search Bar
// http://codeconvey.com/expanding-search-bar-with-jquery/

$(document).ready(function(e) {
    $(".SlideoutActive").toggle(function() {
        $("ul li").each(function(index, element) {
            $(this).animate({
                "margin-left": index * 105
            });
            $(this).css("transition", "all .5s ease-in-out");
        });
    }, function() {
        $(".SlideOutMenu ul li").each(function(index, element) {
            $(this).animate({
                "margin-left": 0
            });
        });
    });
    //
});
