var EmmasApp = EmmasApp || {};

EmmasApp.audioPlayer = (function(){
	var soundFile,
		audio;

	function play(fileName){
		soundFile = getFilePath(fileName);
        audio = new Audio(soundFile);
        audio.play();
	}

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