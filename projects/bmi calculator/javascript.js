window.onload = function () {
    let button = document.getElementById("calculate");
    button.addEventListener("click", calculateBMI);
}

function calculateBMI() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let resultMessage = document.getElementById("result-message");

    if (isNaN(weight) || weight <= 0) {
        resultMessage.innerHTML = 'Enter a valid weight (kg)';
        return;
    }

    if (isNaN(height) || height <= 0) {
        resultMessage.innerHTML = 'Enter a valid height (m)';
        return;
    }

    // Calculate BMI
    let bmi = (weight / (height * height)).toFixed(2);
    resultMessage.innerHTML = `Your BMI is ${bmi}`;

    // Optionally, add categories
    if (bmi < 18.5) {
        resultMessage.innerHTML += '<br>Category: Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        resultMessage.innerHTML += '<br>Category: Normal';
    } else {
        resultMessage.innerHTML += '<br>Category: Overweight';
    }
}