var EmmasApp = EmmasApp || {};

EmmasApp.audioPlayer = (function(){
	var soundFile,
		audio,
		introAudio = new Audio(getFilePath("xylophone")),
		applauseAudio,
		minionAudio;

	function play(fileName, doLoop){
		// Set do Loop to false if it is not defined or not a boolean
		// Otherwise doLoop should remain the same
		doLoop = doLoop === undefined ? false : doLoop;
		doLoop = typeof(doLoop) === 'boolean' ? doLoop : false;


		soundFile = getFilePath(fileName);
		
		if(audio !== undefined){
			stop();
		}

        audio = new Audio(soundFile);
        audio.loop = doLoop;
        audio.play();
        
	}

	function playCached(audioObj){
		if(audio !== undefined){
			stop();	
		} 
		
		audio = audioObj;
		audio.play();
	}

	function getFilePath(name){
		return '../audio/' + name + '.wav';
	}

	function stop(){
		audio.pause();
	}

	return{
		play : function(fileName){
			play(fileName);
		},
		applaud : function(){
			if(applauseAudio === undefined){
				applauseAudio = new Audio(getFilePath("applause"));
			}

			playCached(applauseAudio);
		},
		intro : function(){
			playCached(introAudio);
		},
		minions : function(){
			if(minionAudio === undefined){
				minionAudio = new Audio(getFilePath('minions'));
			}
			playCached(minionAudio);
		}
	};
}());