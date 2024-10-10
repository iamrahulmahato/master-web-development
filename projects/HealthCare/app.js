document.getElementById('symptomForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading indicator
    document.getElementById('loading').classList.remove('hidden');

    // Gather selected symptoms
    const selectedSymptoms = [];
    document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
        selectedSymptoms.push(checkbox.value);
    });

    // Initialize prediction variables
    let medicine = 'Unknown';
    let diet = 'Unknown';
    let precautions = 'Unknown';

    // Mock prediction logic based on selected symptoms
    if (selectedSymptoms.includes('fever') && selectedSymptoms.includes('headache')) {
        medicine = 'Paracetamol';
        diet = 'Stay hydrated; drink plenty of fluids.';
        precautions = 'Rest well and avoid strenuous activities.';
    } else if (selectedSymptoms.includes('cough')) {
        medicine = 'Cough Syrup';
        diet = 'Avoid cold drinks; prefer warm liquids.';
        precautions = 'Cover your mouth while coughing and avoid close contact with others.';
    } else if (selectedSymptoms.includes('stomach ache')) {
        medicine = 'Antacid';
        diet = 'Eat light meals; avoid spicy foods.';
        precautions = 'Consult a doctor if symptoms persist.';
    } else if (selectedSymptoms.includes('nausea')) {
        medicine = 'Anti-nausea medication';
        diet = 'Eat bland foods like crackers and toast.';
        precautions = 'Avoid strong smells and heavy meals.';
    } else {
        medicine = 'Consult a doctor for proper medication.';
        diet = 'Follow a balanced diet as per health guidelines.';
        precautions = 'Seek medical attention for further advice.';
    }

    // Update results
    document.getElementById('medicine').innerText = medicine;
    document.getElementById('diet').innerText = diet;
    document.getElementById('precautions').innerText = precautions;

    // Hide loading indicator and show result
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    
    // Add to history
    addToHistory(medicine, diet, precautions);
});

// Reset button functionality
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('symptomForm').reset();
    document.getElementById('result').classList.add('hidden');
    document.getElementById('history').classList.add('hidden');
});

// Function to add prediction to history
function addToHistory(medicine, diet, precautions) {
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>Medicine:</strong> ${medicine}, <strong>Diet:</strong> ${diet}, <strong>Precautions:</strong> ${precautions}`;
    historyList.appendChild(listItem);
    document.getElementById('history').classList.remove('hidden');
}

// Feedback submission
document.getElementById('submitFeedback').addEventListener('click', function() {
    const rating = document.getElementById('rating').value;
    alert(`Thank you for your feedback! You rated it: ${rating} stars.`);
});
// Clear history button functionality
document.getElementById("clearHistoryBtn").addEventListener("click", function() {
    document.getElementById("historyList").innerHTML = "";
    document.getElementById("history").classList.add("hidden");
});
