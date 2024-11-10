function TimeCounter() {
	this.minutesLabel = document.getElementById("minutes");
	this.secondsLabel = document.getElementById("seconds");
	this.totalSeconds = 0;
	var that = this;

	this.pad = function(val)
	{
		var valString = val + "";
		if(valString.length < 2)
		{
			return "0" + valString;
		}
		else
		{
			return valString;
		}
	}

	this.setTime = function()
	{
		++that.totalSeconds;
		that.secondsLabel.innerHTML = that.pad(that.totalSeconds%60);
		that.minutesLabel.innerHTML = that.pad(parseInt(that.totalSeconds/60));
	}	
}
