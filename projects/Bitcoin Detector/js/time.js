

var timerUpdate = setInterval(timeUpdate, 1000);

function timeUpdate(){
	var today = new Date();
	var hours = checkLength(today.getHours());
	var minutes = checkLength(today.getMinutes());
	var seconds = checkLength(today.getSeconds());
	var time = hours + ":" + minutes + ":" + seconds;
	document.getElementById("time").innerHTML = time;
}

function checkLength(unit){
	if (unit < 10){
		unit = "0" + unit;
	}
	return unit;
}



