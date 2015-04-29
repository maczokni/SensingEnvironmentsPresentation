var currentSlide = 0;

$(function(){
	initSlides();
	$(document).keyup(function(e){
		if(e.keyCode ==39 || e.keyCode ==40|| e.keyCode ==32) next();
		else if(e.keyCode == 37 || e.keyCode== 38) back();
		else if(e.keyCode==87)  toggleFullScreen();


	});
	$('slides').swipe({
		swipe:function(event, direction, distance, duration, fingerCount){
			switch(direction){
				case 'left':
					next();
					break;
				case 'right':
					back();
					break;
			}

		}
	});
});

	$('slides').ready( function() {
            var $body = $('body'); //Cache this for performance

            var setBodyScale = function() {
                var scaleSource = $body.width(),
                    scaleFactor = 0.35,                     
                    maxScale = 600,
                    minScale = 30; //Tweak these values to taste

                var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:

                if (fontSize > maxScale) fontSize = maxScale;
                if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums

                $('body').css('font-size', fontSize + '%');
            }

            $(window).resize(function(){
                setBodyScale();
            });

            //Fire it when the page first loads:
            setBodyScale();
        });

function initSlides(){
	$('section').eq(currentSlide).addClass('active');
}

function whiteScreen(){
	goto($('section').removeClass('active'));
}

function next(){
	goto(currentSlide + 1);
}

function back(){
	goto(currentSlide - 1);
}

function goto(n){
	if(n>-1 && n <$('section').length) currentSlide = n;
	else return;
	$('section').removeClass('active').eq(currentSlide).addClass('active');
}
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

