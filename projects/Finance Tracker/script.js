// Get DOM elements
const form = document.getElementById('transaction-form');
const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount');
const notification = document.getElementById('notification');
const budgetForm = document.getElementById('budget-form');

// Data for charts
let categoryData = {
    'Food': 0,
    'Rent': 0,
    'Entertainment': 0,
    'Utilities': 0
};

let monthlyExpenses = [];

// Initial budget limits (will be updated by user)
let budgetLimits = {
    'Food': 0,
    'Rent': 0,
    'Entertainment': 0,
    'Utilities': 0
};

// Initialize Chart.js charts
const expenseChart = new Chart(document.getElementById('expenseChart').getContext('2d'), {
    type: 'pie',
    data: {
        labels: Object.keys(categoryData),
        datasets: [{
            label: 'Spending by Category',
            data: Object.values(categoryData),
            backgroundColor: ['#00557D', '#106575', '#725483', '#b28f62']
        }]
    }
});

const monthlyChart = new Chart(document.getElementById('monthlyChart').getContext('2d'), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Monthly Spending',
            data: monthlyExpenses,
            backgroundColor: '#c9ada7'
        }]
    }
});

// Handle form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from form
    const foodBudget = parseFloat(document.getElementById('budget-food').value);
    const rentBudget = parseFloat(document.getElementById('budget-rent').value);
    const entertainmentBudget = parseFloat(document.getElementById('budget-entertainment').value);
    const utilitiesBudget = parseFloat(document.getElementById('budget-utilities').value);

    // Set budget limits
    budgetLimits['Food'] = foodBudget;
    budgetLimits['Rent'] = rentBudget;
    budgetLimits['Entertainment'] = entertainmentBudget;
    budgetLimits['Utilities'] = utilitiesBudget;

    // Notify user budgets are set
    alert("Budget limits set successfully!");

    // Clear the form
    budgetForm.reset();
});

// Handle transaction form submission to add transactions
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from form
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);

    // Update data for charts
    categoryData[category] += amount;
    updateExpenseChart();

    // Track monthly expense (for simplicity, we'll assume all transactions are in the same month)
    monthlyExpenses.push(amount);
    updateMonthlyChart();

    // Check if budget limit exceeded
    if (categoryData[category] > budgetLimits[category]) {
        notification.style.display = 'block';
    }else {
        notification.style.display = 'none';
    }

    // Reset form
    amountInput.value = '';
});

// Update the expense chart
function updateExpenseChart() {
    expenseChart.data.datasets[0].data = Object.values(categoryData);
    expenseChart.update();
}

// Update the monthly spending chart
function updateMonthlyChart() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    monthlyChart.data.labels.push(currentMonth);
    monthlyChart.data.datasets[0].data = monthlyExpenses;
    monthlyChart.update();
}

// Existing script code for budget tracker...

// Custom cursor logic
const cursor = document.getElementById('custom-cursor');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Expand cursor when hovering over interactive elements
const interactiveElements = document.querySelectorAll('button, input, select');

interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
        cursor.classList.add('expand');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
    });
});