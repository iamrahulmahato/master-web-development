// Grabbing elements from the DOM
const billAmountInput = document.getElementById('billAmount');
const tipPercentageInput = document.getElementById('tipPercentage');
const peopleInput = document.getElementById('people');
const calculateButton = document.getElementById('calculateButton');
const totalTipDisplay = document.getElementById('totalTip');
const tipPerPersonDisplay = document.getElementById('tipPerPerson');
const totalPerPersonDisplay = document.getElementById('totalPerPerson');

// Function to calculate tip
function calculateTip() {
  // Get values from inputs
  const billAmount = parseFloat(billAmountInput.value);
  const tipPercentage = parseFloat(tipPercentageInput.value);
  const numberOfPeople = parseInt(peopleInput.value);

  // Validate inputs
  if (isNaN(billAmount) || isNaN(tipPercentage) || isNaN(numberOfPeople) || billAmount <= 0 || tipPercentage <= 0 || numberOfPeople <= 0) {
    alert('Please enter valid numbers.');
    return;
  }

  // Calculate tip and totals
  const totalTip = (billAmount * (tipPercentage / 100)).toFixed(2);
  const tipPerPerson = (totalTip / numberOfPeople).toFixed(2);
  const totalPerPerson = ((billAmount + parseFloat(totalTip)) / numberOfPeople).toFixed(2);

  // Update the UI with Indian Rupees (₹)
  totalTipDisplay.innerText = totalTip;
  tipPerPersonDisplay.innerText = tipPerPerson;
  totalPerPersonDisplay.innerText = totalPerPerson;
}

// Event listener for the Calculate button
calculateButton.addEventListener('click', calculateTip);
