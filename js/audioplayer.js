EmmasApp = EmmasApp || {};

EmmasApp.audioPlayer = (function(){
	var audio, soundFile;

	function play(fileName){
		soundFile = '../audio/' + fileName + '.wav';
        audio = new Audio(soundFile);
        audio.play();
	}

	return{
		play : function(fileName){
			play(fileName);
		},
		applaud : function(){
			play("applause");
		},
		intro : function(){
			play("xylophone");
		},
		minions : function(){
			play("minions");
		}
	};
}());