
//Create Request varible 
var request = new XMLHttpRequest()

//Set timer to get request every few seconds
var timer = setInterval(getRequest, 10000);
var data;
//Currency default
var currency = "USD";
//Store data points 
var dataPoints = [];

//This function gets the data from the block chain website
function getRequest()
{
request.open('GET', 'https://www.blockchain.com/ticker', true)
//Log progress
console.log('Get Called')

request.onload = function() {
  // Begin accessing JSON data here
  data = JSON.parse(this.response)

  // if we get a good response from server
  if (request.status >= 200 && request.status < 400) {
	  //Log good news
	  console.log('Api Good')
      console.log(data[currency])
	  //Add to data points array for chart
	  dataPoints.push({y: data[currency]["15m"]});
	  //Update the chart
	  window.updateChart();
	  //Update the table with bitcoin info
	  UpdateTable()
	//If API fail, output error!
  } else {
    console.log('error')
  }
}
//Send the request
request.send()
}

//This function updates the table 
function UpdateTable(){
document.getElementById("minute").innerHTML = data[currency]["15m"];
	document.getElementById("last").innerHTML = data[currency]["last"];
	document.getElementById("buy").innerHTML = data[currency]["buy"];
}

//If the currrency is changed by the user, this function is called.
function changeCurr(curr){
	currency = curr;
	//Reset data points, new currency
	dataPoints = [];
	document.getElementById("dropdn").innerHTML = currency;
	//Log new currency 
	console.log(currency);
	//Get new request for new currency 
	getRequest();
}

getRequest()

