var EmmasApp = EmmasApp || {};

EmmasApp.audioPlayer = (function(){
	var soundFile,
		audio,
		introAudio, //= new Audio(getFilePath("xylophone")), 
		applauseAudio,
		minionAudio,
		soundObject = {};

	function play(fileName){
		// Play the cached version if found in the soundObject
		if(fileName in soundObject){
			playCached(soundObject[fileName]);
			return;
		}

		soundFile = getFilePath(fileName);
		if(audio !== undefined){
			audio.pause();
		}

        audio = new Audio(soundFile);
        audio.play();

        //Deep copy of audio, store in color sound array
        soundObject[fileName] = jQuery.extend(true, {}, audio);
	}

	function playCached(audioObj){
		if(audio !== undefined){
			audio.pause();
		} 
		
		audio = audioObj;
		audio.play();
	}

	function getFilePath(name){
		return '../audio/' + name + '.wav';
	}

	return{
		play : play,
		applaud : function(){
			if(applauseAudio === undefined){
				applauseAudio = new Audio(getFilePath("applause"));
			}

			playCached(applauseAudio);
		}
	};
}());