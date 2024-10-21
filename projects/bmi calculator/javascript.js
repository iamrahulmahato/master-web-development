window.onload = function () {
    let button = document.getElementById("calculate");
    button.addEventListener("click", calculateBMI);
}

function calculateBMI() {
    let weightInput = parseFloat(document.getElementById("weight").value);
    let weightUnit = document.getElementById("weight-unit").value;
    let heightInput = parseFloat(document.getElementById("height").value);
    let heightUnit = document.getElementById("height-unit").value;
    let resultMessage = document.getElementById("result-message");
    let bmiCategory = document.getElementById("bmi-category");
    let healthTips = document.getElementById("health-tips");
    let resultContainer = document.getElementById("result-container");

    // Reset previous results
    resultMessage.innerHTML = '';
    bmiCategory.innerHTML = '';
    healthTips.innerHTML = '';
    resultContainer.classList.remove('show');

    // Input Validation
    if (isNaN(weightInput) || weightInput <= 0) {
        resultMessage.innerHTML = 'Please enter a valid weight.';
        resultContainer.classList.add('show');
        return;
    }

    if (isNaN(heightInput) || heightInput <= 0) {
        resultMessage.innerHTML = 'Please enter a valid height.';
        resultContainer.classList.add('show');
        return;
    }

    // Convert weight to kilograms if necessary
    let weightInKg = weightInput;
    if (weightUnit === 'lbs') {
        weightInKg = weightInput * 0.453592;
    }

    // Convert height to meters
    let heightInM = heightInput;
    switch (heightUnit) {
        case 'cm':
            heightInM = heightInput / 100;
            break;
        case 'in':
            heightInM = heightInput * 0.0254;
            break;
        case 'ft':
            heightInM = heightInput * 0.3048;
            break;
        default:
            heightInM = heightInput;
    }

    // Calculate BMI
    let bmi = (weightInKg / (heightInM * heightInM)).toFixed(2);
    resultMessage.innerHTML = `Your BMI is <strong>${bmi}</strong>`;

    // Determine BMI Category and Health Tips
    let category = '';
    let categoryClass = '';
    let healthAdvice = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'underweight';
        healthAdvice = 'You are underweight. Consider eating more calories and incorporating strength training into your fitness routine to build muscle mass.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal';
        categoryClass = 'normal';
        healthAdvice = 'You have a normal BMI. Maintain a balanced diet and regular exercise to stay healthy!';
    } else {
        category = 'Overweight';
        categoryClass = 'overweight';
        healthAdvice = 'You are overweight. Consider a balanced diet and regular exercise to achieve a healthier weight. Consult a healthcare provider if needed.';
    }

    bmiCategory.innerHTML = `<span class="category ${categoryClass}">${category}</span>`;
    healthTips.innerHTML = `<p>${healthAdvice}</p>`;

    // Show Result with Animation
    resultContainer.classList.add('show');
}