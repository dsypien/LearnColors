$(document).ready(function(){
	$('#main').animate({
		opacity: 1.0,
	  }, 1500 );
	  
	$('.smalltile').click(function(){
		alert( this.id + " clicked");
	});
});