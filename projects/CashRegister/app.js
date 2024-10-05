var bill = document.querySelector("#bill-amount");
var billLabel = document.querySelector(".input-label");
var cashPaid = document.querySelector("#cash-given");
var cashLabel = document.querySelector(".input-label2");
var checkButton = document.querySelector("#check-button");
var errorMsg = document.querySelector("#error-message");
var noOfNotes = document.querySelectorAll(".no-of-notes");
var next = document.querySelector("#next-button");
var returnTable = document.querySelector("#return");
var table = document.querySelector(".change-table");
 next.addEventListener("click",nextt);
 checkButton.addEventListener("click",validateBillAndCashPaid);
hideall()
function hideall(){

    cashPaid.style.display = "none";
    checkButton.style.display = "none";
    cashLabel.style.display = "none";
    returnTable.style.display = "none";
    table.style.display = "none";
   
}

function nextt(){
    if(bill.value === "")
{
    showMsg("Enter the amount!!");
}
else if(bill.value <= 0){
    showMsg("Enter a Valid amount!!");
}else{
    next.style.display="none";
    errorMsg.style.display = "none";
    cashLabel.style.display = "block";
    cashPaid.style.display = "block";
    checkButton.style.display = "block";
}
}

var availableNotes = [2000,500,100,20,10,5,1];
function validateBillAndCashPaid(){
    if(cashPaid.value > 0 )
    { 
      if(Number(cashPaid.value) >= Number(bill.value))  {
        if(Number(cashPaid.value) > Number(bill.value)){
            errorMsg.style.display = "block";
            returnTable.style.display = "block";
            table.style.display = "block";
            var amountToBeReturned = Number(cashPaid.value) - Number(bill.value);
            showMsg(`The amount to be returned is ${amountToBeReturned}`);
            calculateChange(amountToBeReturned);

               }
               else{
                errorMsg.style.display = "block";
                showMsg("No change is to be given.");
                // returnTable.style.display = "none";
                // table.style.display = "none";   
            }
        }
        
        else
        {  
             showMsg("The amount should be atleast equal to the bill amount");
        returnTable.style.display = "none";
        table.style.display = "none";
        }
}

 else{
        showMsg("You need to pay the bill!!");
    }
}

function showMsg(message){
    
    errorMsg.style.display = "block";
    errorMsg.innerText = message;
}

 function calculateChange(amountToBeReturned)
 {
    for(let i = 0; i < availableNotes.length; i++)
    {
        var numberOfNotes = Math.trunc(amountToBeReturned/availableNotes[i]);
        amountToBeReturned=amountToBeReturned % availableNotes[i];
        noOfNotes[i].innerText = numberOfNotes;        
    }
 }
 
 

 