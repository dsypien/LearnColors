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
		// if(fileName in soundObject){
		// 	playCached(soundObject[fileName]);
		// 	return;
		// }

		soundFile = getFilePath(fileName);
        audio = new Audio(soundFile);
        audio.play();

        // store the audio in the sound object
        soundObject[fileName] = audio;
	}

	// function playCached(audioObj){		
	// 	audioObj.play();
	// }

	function getFilePath(name){
		return '../audio/' + name + '.wav';
	}

	function stop(){
		if(!audio.paused){
			audio.pause();
		}
	}

	return{
		play : play
	};
}());