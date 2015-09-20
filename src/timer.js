window.onload = function () {
	$('#start').click(function(){
		var display = $('#time');
		var duration = getDesiredDurationInMinutes() * 60;
		startTimer(duration, display);
	});

	$('#stop').click(function(){
		stopTimer();
		stopAlarm();
	});
};

function getDesiredDurationInMinutes(){
	var durationInMinutes = $("#duration").val();
	if(! durationInMinutes){
		durationInMinutes = $('#duration').attr('placeholder');
	}

	return durationInMinutes;
}

var timerId;

function startTimer(duration, display) {
	stopTimer();

    var timer = duration;
    var minutes;
    var seconds;
    
    timerId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $(display).text(minutes + ":" + seconds);

        if (--timer < 0) {
        	clearInterval(timerId);
            triggerAlarm();
        }
    }, 1000);
}

function stopTimer(){
	clearInterval(timerId);
}

var audio = document.getElementById("delete_your_code_audio");

function triggerAlarm(){
	audio.loop = true;
	audio.currentTime = 0;
	audio.play();
}

function stopAlarm(){
	audio.pause();
}