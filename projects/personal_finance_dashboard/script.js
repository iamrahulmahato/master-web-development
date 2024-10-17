const addBtn = document.getElementById('addBtn');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const incomeTotalDisplay = document.getElementById('incomeTotal');
const expenseTotalDisplay = document.getElementById('expenseTotal');
const balanceDisplay = document.getElementById('balance');
const transactionList = document.getElementById('transactionList');
const watermark = document.querySelector('.watermark'); // Watermark element

// Initialize totals and arrays for charts
let incomeTotal = 0;
let expenseTotal = 0;
let transactions = [];

// Chart setup
const pieCtx = document.getElementById('pieChart').getContext('2d');
const barCtx = document.getElementById('barChart').getContext('2d');

let pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Income vs Expenses',
            data: [0, 0],
            backgroundColor: ['#4caf50', '#f44336'],
            hoverBackgroundColor: ['#66bb6a', '#ef5350'], // Hover colors
            borderColor: '#fff',
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ₹' + context.raw.toFixed(2);
                        }
                        return label;
                    }
                }
            }
        }
    }
});

let barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Transaction Amounts',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)', // Hover color
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ₹' + context.raw.toFixed(2);
                        }
                        return label;
                    }
                }
            }
        }
    }
});

addBtn.addEventListener('click', () => {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description && !isNaN(amount)) {
        transactions.push({ description, amount, type });

        if (type === 'income') {
            incomeTotal += amount;
        } else if (type === 'expense') {
            expenseTotal += amount;
        }

        updateSummary();
        addTransactionToList(description, amount, type);
        updateCharts();
        clearInputs();
    } else {
        alert("Please enter a valid description and amount.");
    }
});

function updateSummary() {
    incomeTotalDisplay.textContent = `Total Income: ₹${incomeTotal.toFixed(2)}`;
    expenseTotalDisplay.textContent = `Total Expenses: ₹${expenseTotal.toFixed(2)}`;
    balanceDisplay.textContent = `Balance: ₹${(incomeTotal - expenseTotal).toFixed(2)}`;
}

function addTransactionToList(description, amount, type) {
    const transactionItem = document.createElement('li');
    transactionItem.classList.add('transaction');
    transactionItem.textContent = `${description}: ₹${amount.toFixed(2)}`;
    transactionItem.style.color = type === 'expense' ? 'red' : 'green';
    transactionList.appendChild(transactionItem);
}

function updateCharts() {
    pieChart.data.datasets[0].data[0] = incomeTotal;
    pieChart.data.datasets[0].data[1] = expenseTotal;
    pieChart.update();

    // Update bar chart data
    barChart.data.labels = transactions.map(t => t.description);
    barChart.data.datasets[0].data = transactions.map(t => t.amount);
    barChart.update();

    // Show or hide watermark based on transactions
    if (transactions.length === 0) {
        watermark.style.display = 'block'; // Show watermark if no transactions
    } else {
        watermark.style.display = 'none'; // Hide watermark if there are transactions
    }
}

function clearInputs() {
    descriptionInput.value = '';
    amountInput.value = '';
}

// Initial call to ensure the watermark is visible on load
updateCharts();
