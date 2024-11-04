// Budget and Expense Data
let monthlyLimit = 0;
let expenses = [];

// DOM Elements
document.getElementById('setLimit').addEventListener('click', setMonthlyLimit);
document.getElementById('addExpense').addEventListener('click', addExpense);

// Set Monthly Limit
function setMonthlyLimit() {
    const limitInput = document.getElementById('monthlyLimit');
    monthlyLimit = parseFloat(limitInput.value) || 0;
    limitInput.value = '';
    updateUI();
}

// Add Expense
function addExpense() {
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;

    if (name && amount && date) {
        expenses.push({ name, amount, date });
        
        // Clear input fields
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDate').value = '';
        
        updateUI();
        checkLimitExceeded();
    } else {
        alert('Please fill all fields');
    }
}

// Check if limit is exceeded
function checkLimitExceeded() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    if (totalExpenses > monthlyLimit && monthlyLimit > 0) {
        showAlert(`You've exceeded your monthly limit of ₹${monthlyLimit.toFixed(2)}!`);
    }
}

// Show Alert
function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';
    alertDiv.innerHTML = `
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        ${message}
    `;
    document.body.appendChild(alertDiv);

    // Remove the alert after 5 seconds
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 5000);
}

// Update UI
function updateUI() {
    // Update status displays
    document.getElementById('limitAmount').textContent = `₹${monthlyLimit.toFixed(2)}`;
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = `₹${totalExpenses.toFixed(2)}`;
    
    const remaining = monthlyLimit - totalExpenses;
    document.getElementById('remainingAmount').textContent = `₹${remaining.toFixed(2)}`;

    // Update expenses list
    renderExpensesList();
    
    // Update chart
    updateChart();
}

// Render Expenses List
function renderExpensesList() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = expenses.map((expense, index) => `
        <li>
            ${expense.name} - ₹${expense.amount.toFixed(2)} - ${expense.date}
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        </li>
    `).join('');
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}

// Update Chart
function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    // Group expenses by date
    const expensesByDate = {};
    expenses.forEach(expense => {
        if (expensesByDate[expense.date]) {
            expensesByDate[expense.date] += expense.amount;
        } else {
            expensesByDate[expense.date] = expense.amount;
        }
    });

    // Destroy previous chart if it exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create new chart
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(expensesByDate),
            datasets: [{
                label: 'Daily Expenses',
                data: Object.values(expensesByDate),
                borderColor: '#45a049',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₹)'
                    }
                }
            }
        }
    });
}