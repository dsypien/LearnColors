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
	  }, 1000 );
	  
	viewstack.push("#mainview");
	 
	$('#previousview').click(function(){
		var curview = viewstack.pop();
		
		$(getCurrentView()).show();
		$(getCurrentView()).animate({
			"height": "90%"
			}, 1000, function(){
				$(curview).css("height", 0);
			}
		);
		
		// If the current view is the only view on the stack, there is
		// no previous view.  Hide the previousview button
		if(viewstack.length == 1){
			$('#previousview').css("visibility", "hidden");
		}
	});	
	  
	$('.tilebutton').click(function(){
		$('#tileview').css({
			"height": "90%"
		});
		
		$('#tilecolumn1').css({
			"background":this.parentNode.attributes.color.nodeValue
		});
		
		hideview('#mainview');
		viewstack.push("#tileview");
		$('#previousview').css("visibility", "visible");
	});
});

function hideview(viewname){
	$(viewname).animate({
		"height": "0"
		}, 500, function(){
			$(viewname).hide();
		}
	);
}