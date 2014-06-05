var baloons = (function(){
	var kappa = ( 4 * (Math.sqrt(2) -1) ) / 3;
	var widthPct = 0.0333;
	var heightPct = 0.4;
	var tieWidthPct = 0.12;
	var tieHeightPct = 0.1;
	var tieCurvePct = 0.13;
	var gradientPct = 0.3;
	var gradientCircleRadius = 3;

	function Baloon(element, x, y, radius, color){
		var canvas = $(element);

		if(!canvas.getContext){
			return;
		}

		this.context = canvas.getcontext('2d');
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.baseColor = new Color(color);
		this.darkColor = (new Color(color)).darken(gradientPct);
		this.lightColor = (new Color(color)).lighten(gradientPct);
	}

	return{
		'draw' : function(){

		}
	};
})();