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

function getCurrentView(){
	var size = viewstack.length;
	
	if( size < 1){
		return null;
	}
	
	return viewstack[ size - 1];
}

$(document).ready(function(){
	$('#main').animate({
		opacity: 1.0
	  }, 1500 );
	  
	viewstack.push("#mainview");
	 
	$('#previousview').click(function(){
		hideview(viewstack.pop());
		
		$(getCurrentView()).animate({
			"height": "90%"
			}, 1000, function(){
				//oncomplete
			}
		);
	});	
	  
	$('.smalltile').click(function(){
		$('#tileview').css("background", this.attributes.color.nodeValue);
		hideview('#mainview');
		
		viewstack.push("#tileview");
	});
});

function hideview(viewname){
	$(viewname).animate({
			"height": "0"
			}, 1000, function(){
			    // on complete
			}
		);
}