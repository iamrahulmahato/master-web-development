function addToWallet(){
	//Ask User for Info 
	var Type = prompt("Enter the Cyptro", "Bitcoin");
	var Quantity = prompt("Enter the Quantity","3");
	var Sell = prompt("Enter Current Value", "100");
	var table = document.getElementById("wallets");
	
	//Insert Data in table
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	cell1.innerHTML = Type;
	cell2.innerHTML = Sell;
	cell3.innerHTML = Quantity;
	//Calculate Total
	cell4.innerHTML = Sell * Quantity;
  

}