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

var viewstack = new Array();

$(document).ready(function(){
	$('#main').animate({
		opacity: 1.0,
	  }, 1500 );
	  
	viewstack.push("#mainview");
	  
	$('.smalltile').click(function(){
		$('#tileview').css("background", this.attributes.color.nodeValue);
		viewstack.push("#tileview");
	
		$('#mainview').animate({
			"height": "0"
			}, 1000, function(){
			    // on complete
			}
		);	
	});
});