// Distribution Chart
const distributionCtx = document.getElementById('distributionChart').getContext('2d');
new Chart(distributionCtx, {
    type: 'pie',
    data: {
        labels: ['Defence', 'Agriculture', 'Education', 'Health', 'Others'],
        datasets: [{
            data: [5.93537, 1.15531, 1.12899, 0.89155, 35.91975],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Budget Distribution (in Lakh Crore ₹)'
            }
        }
    }
});

// GDP Growth Chart
const gdpCtx = document.getElementById('gdpChart').getContext('2d');
new Chart(gdpCtx, {
    type: 'line',
    data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'GDP Growth Rate (%)',
            data:  [4.0, -7.3, 8.7, 7.0, 6.5],
            borderColor: '#4ECDC4',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'GDP Growth Rate Projection'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});