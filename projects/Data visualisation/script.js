// script.js

// Data for the charts
const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Website Traffic',
        data: [500, 600, 800, 1200, 1500, 1100, 1300],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
    }]
};

const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Monthly Sales',
        data: [20, 25, 30, 45, 60, 55, 65],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
    }]
};

// Line Chart Configuration
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: lineChartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Visitors'
                }
            }
        }
    }
});

// Bar Chart Configuration
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: barChartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Sales'
                }
            }
        }
    }
});
