var colors = {
	"red":1, 
	"orange":2,
	"yellow":3,
	"green":4,
	"blue":5,
	"purple":6,
	"black":7,
	"white":8,
	"brown":9
};

$(document).ready(function(){
	$('#main').animate({
		opacity: 1.0,
	  }, 1500 );
	  
	$('.smalltile').click(function(){
		//alert( this.attributes.color.nodeValue + " clicked");
		$('#mainview').css("height", "0");
		$('#tileview').css("background", this.attributes.color.nodeValue);
	});
});