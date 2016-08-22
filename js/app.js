$(document).ready(function() {
	var workTime = $('#work-time'),
		breakTime = $('#break-time'),
		status = $('#status');
   
	//Break Length Controls

	$('#minusBreak').click(function() {
		status.text('Break');
		if(parseInt(breakTime.text()) > 1) {
			breakTime.text(parseInt(breakTime.text())-1);
		}
		
	});

	$('#plusBreak').click(function() {
		status.text('Break');
		breakTime.text(parseInt(breakTime.text()) + 1);
	});


	//Session Length Controls

	$('#minusWork').click(function() {
		status.text("Work");
		if (parseInt(workTime.text()) > 1) {
			workTime.text(parseInt(workTime.text()) -1);
		}
	});

	$("#plusWork").click(function() {
		status.text('Work');
		workTime.text(parseInt(workTime.text()) +1);
	});	


	//alarm audio
	var audio = new Audio('http://soundbible.com/grab.php?id=1377&type=mp3');

	function alarm() {
		audio.play();
	}

    //function to keep double digits
    function padTime(val) {
    	return ('00' + val).slice(-2);
    }

    //display time

    var timeElement = document.getElementById('timer');

    function updateDisplay(time) {
    	var hours = Math.floor(time / 3600);
    	time -= hours * 3600;
    	var minutes = Math.floor(time / 60);
    	time -= minutes * 60;
    	var seconds = Math.floor(time);
    	timeElement.innerHTML = padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds);
        
    }

    var time = 0;
    var totalTime;
    updateDisplay(time);
    var running = true;
    var lastTime = (new Date()).getTime();

    //run timer
    function update() {
    	if (time <= 0.0) {
    		return;
    	}

    	var currTime = (new Date()).getTime();
    	var timeDiff = (currTime - lastTime) / 1000.0;
    	lastTime = currTime;
    	time -= timeDiff;


	    	//color scheme
	    if (status.text() === 'Work') {
	    	totalTime = (workTime.text() * 60);
	    	water = 'rgba(0, 178, 51, 1)';
	    }

	    if (status.text() === 'Break') {
	    	totalTime = (breakTime.text() * 60);
	    	water = 'rgba(255, 0, 0, 1)';
	    }
	    //value for progress animation
	    var fraction = 1 - (time / totalTime);


	    $('#progress').waterbubble({
	    	data: fraction,
	    	animation: false,
	    	waterColor: water,
	    });

	    if (time <= 0.0) {
	    	if (status.text() === 'Work') {
	    		alarm();
	    		status.text('Break');
	    		time = breakTime.text() * 60;
	    	} else {
	    		alarm();
	    		status.text('Work');
	    		time = workTime.text() * 60;
	    	}
	    }
	    updateDisplay(time);
	    if (running) {
	    	requestAnimationFrame(update);
	    }

    }

    function run() {
    	status.text('Work');
    	if (time <=0.0) {
    		time = workTime.text() * 60;

    	} 
    	lastTime = (new Date()).getTime();
    	running = true;
    	requestAnimationFrame(update);
    }

    function pause() {
    	running = false;
    }
    function stop() {
    	running = false;
    	time = 0;
    	timeElement.innerHTML = '00:00:00';
    	status.text('Work');
    	workTime.text(25);
    	breakTime.text(5);
    	$("#progress").waterbubble({
    		data: 0.0,
    		animation: false,
    		waterColor: 'rgba(255, 252, 25, 1)',
    	});
    }

    var startButton = document.getElementById('start');
    var pauseButton = document.getElementById('pause');
    var resetButton = document.getElementById('reset');

    startButton.onclick = run;
    pauseButton.onclick = pause;
    resetButton.onclick = stop;


    $('#progress').waterbubble({

    	//bubble size
    	radius: 100,

    	//border width
    	lineWidth: undefined,

    	//data to present
    	data: 0.0,

    	// text color
    	textColor: 'rgba(06, 85, 128, 0.8)',

	    // custom font family
	    font: '',

	    // show wave
	    wave: false,

	    // custom text displayed inside the water bubble
	    txt: undefined,

	    // enable water fill animation
	    animation: false,


    });






})