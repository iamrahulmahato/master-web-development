const carbonFootprintData = {
    car: { footprint: 250, suggestion: "Consider carpooling or using public transport." },
    bus: { footprint: 100, suggestion: "Great choice! You can further reduce impact by walking to the station." },
    bike: { footprint: 10, suggestion: "Awesome! Riding a bike is eco-friendly." },
    walk: { footprint: 0, suggestion: "Excellent! Walking is the most eco-friendly option." },
    shop: { footprint: 20, suggestion: "Consider buying local products or using eco-friendly materials." }
};

document.getElementById('calculate-button').addEventListener('click', () => {
    const choice = document.getElementById('choice').value;
    const result = carbonFootprintData[choice];
    
    document.getElementById('result').textContent = `Your estimated carbon footprint: ${result.footprint} g CO2`;
    document.getElementById('suggestion').textContent = result.suggestion;
    
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
});

document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
});
