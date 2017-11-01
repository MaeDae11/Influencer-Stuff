//jQuery is required to run this code
// runs video
$(".description-networking").hide()
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



// servicesDescriptionOpen = () => {
//     $(".service-networking-icon").click((event) => {
//         console.log("clicking")
//         event.preventDefault();
//         $(".description-networking").slideDown()
//     })
// }

// servicesDescriptionClose = () => {
//     $(".exit-description").click((event) => {
//         console.log("exiting")
//         event.preventDefault();
//         $(".description-networking").slideUp()
//     })
// }

// servicesDescriptionOpen();
// servicesDescriptionClose();


// // Get the modal
// var $MODAL = $('#myModal');
// // Get the button that opens the modal
// var btn = $('.service-networking-icon');
// // Get the <span> element that closes the modal
// var span = $('.close');
// // When the user clicks on the button, open the modal 
// openModal = () => {
//     btn.click((event) => {
//         event.preventDefault();
//         console.log("button");
//         $MODAL.slideDown();
//     })
// }

// // When the user clicks on <span> (x), close the modal
// closeModalThroughX = () => {
//     span.click((event) => {
//         console.log("span");
//         $MODAL.slideUp();
//     })
// }

// // When the user clicks anywhere outside of the modal, close it

// $(window).click((event) => {
//     event.preventDefault();
//     let target = $( event.target );
//     if (target.is($MODAL)) {
//         console.log("if")
//         $MODAL.slideUp();
//     } else {
//         console.log("else")
//     }
// })


// openModal();
// closeModalThroughX();








/**
 * dialog box v0.1
 * Ashwin Saxena
 */
;( function( window ) {

'use strict';
// checks to see if animation is supported
var support = { animations : Modernizr.cssanimations },
    animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
    onEndAnimation = function( el, callback ) {
        var onEndCallbackFn = function( event ) {
            if( support.animations ) {
                if( event.target != this ) return;
                this.removeEventListener( animEndEventName, onEndCallbackFn );
            }
            if( callback && typeof callback === 'function' ) { callback.call(); }
        };
        if( support.animations ) {
            el.addEventListener( animEndEventName, onEndCallbackFn );
        }
        else {
            onEndCallbackFn();
        }
    };

function extend( a, b ) {
    for( var key in b ) { 
        if( b.hasOwnProperty( key ) ) {
            a[key] = b[key];
        }
    }
    return a;
}

function DialogFx( el, options ) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this.ctrlClose = this.el.querySelector( '[data-dialog-close]' );
    this.isOpen = false;
    this._initEvents();
}
DialogFx.prototype.options = {
    // callbacks
    onOpenDialog : function() { return false; },
    onCloseDialog : function() { return false; }
}

DialogFx.prototype._initEvents = function() {
    var self = this;

    // close action
    this.ctrlClose.addEventListener( 'click', this.toggle.bind(this) );

    // esc key closes dialog
    document.addEventListener( 'keydown', function( ev ) {
        var keyCode = ev.keyCode || ev.which;
        if( keyCode === 27 && self.isOpen ) {
            self.toggle();
        }
    } );

    this.el.querySelector( '.dialog__overlay' ).addEventListener( 'click', this.toggle.bind(this) );
}
DialogFx.prototype.toggle = function() {
    var self = this;
    if( this.isOpen ) {
        classie.remove( this.el, 'dialog--open' );
        classie.add( self.el, 'dialog--close' );
        onEndAnimation( this.el.querySelector( '.dialog__content' ), function() {
            classie.remove( self.el, 'dialog--close' );
        } );
        // callback on close
        this.options.onCloseDialog( this );
    }
    else {
        classie.add( this.el, 'dialog--open' );

        // callback on open
        this.options.onOpenDialog( this );
    }
    this.isOpen = !this.isOpen;
};

// add to global namespace
window.DialogFx = DialogFx;

})( window );

/* calls function to bind click to trigger */
(function() {
    var networkingTrigger = document.querySelector( '[data-dialog="networking"]' ),
        networking = document.getElementById( networkingTrigger.getAttribute( 'data-dialog' ) ),
        dlg = new DialogFx( networking );
    networkingTrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );

    var sponsorshipTrigger = document.querySelector( '[data-dialog="sponsorship"]' ),
        sponsorship = document.getElementById( sponsorshipTrigger.getAttribute( 'data-dialog' ) ),
        dlg = new DialogFx( sponsorship );
    sponsorshipTrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );

    var managementTrigger = document.querySelector( '[data-dialog="management"]' ),
        management = document.getElementById( managementTrigger.getAttribute( 'data-dialog' ) ),
        dlg = new DialogFx( management );
        console.log(dlg)
    managementTrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );
})();
    
