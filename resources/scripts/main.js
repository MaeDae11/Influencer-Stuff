//jQuery is required to run this code
// runs video
$( document ).ready(function() {
    scaleVideoContainer();
    initBannerVideoSize('.featured-video-container .poster img');
    initBannerVideoSize('.featured-video-container .filter');
    initBannerVideoSize('.featured-video-container video');
    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.featured-video-container .poster img');
        scaleBannerVideoSize('.featured-video-container .filter');
        scaleBannerVideoSize('.featured-video-container video');
    });
});
function scaleVideoContainer() {
    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.overall-video-container').css('height',unitHeight);
}
function initBannerVideoSize(element){
    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });
    scaleBannerVideoSize(element);
}
function scaleBannerVideoSize(element){
    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;
    // console.log(windowHeight);
    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');
        $(this).width(windowWidth);
        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
            $(this).width(videoWidth).height(videoHeight);
        }
        $('.overall-video-container .featured-ideo-container video').addClass('fadeIn animated');
    });
}



