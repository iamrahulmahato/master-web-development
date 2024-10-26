window.onload = function () {
updateChart()
}

//Update Chart every time we fetch data
function updateChart(){
var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Bitcoin Price"
	},
	axisY:{
		includeZero: false
	},
	data: [{        
		type: "line",       
		dataPoints: window.dataPoints
		
	}]
});
//Render Chart
chart.render();

}



