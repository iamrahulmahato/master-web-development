import { renderCharts } from './chart.js';

// Initial values
let monthlyBudget = 0;
let expenses = [];
let savingsGoals = [];
let investments = [
    { name: 'Stocks', value: 5000 },
    { name: 'Bonds', value: 2000 },
    { name: 'Real Estate', value: 3000 }
];

// Budgeting function
window.setBudget = function() {
    monthlyBudget = parseFloat(document.getElementById('budget-input').value) || 0;
    renderCharts(expenses, monthlyBudget, savingsGoals, investments);
}

// Expense Tracking function
window.addExpense = function() {
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value) || 0;
    expenses.push({ category, amount });
    renderCharts(expenses, monthlyBudget, savingsGoals, investments);
}

// Savings Goal function
window.setGoal = function() {
    const name = document.getElementById('goal-name').value;
    const amount = parseFloat(document.getElementById('goal-amount').value) || 0;
    savingsGoals.push({ name, amount });
    renderCharts(expenses, monthlyBudget, savingsGoals, investments);
}

// Financial Insights
function updateInsights() {
    const insightsDiv = document.getElementById('insights');
    insightsDiv.innerHTML = `<p>Monthly budget is set to $${monthlyBudget}.</p>`;

    let totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    insightsDiv.innerHTML += `<p>Total spending so far: $${totalExpenses}</p>`;

    if (totalExpenses > monthlyBudget) {
        insightsDiv.innerHTML += `<p style="color:red;">Warning: You have exceeded your monthly budget!</p>`;
    }
}

// Initialize charts and insights
document.addEventListener('DOMContentLoaded', () => {
    renderCharts(expenses, monthlyBudget, savingsGoals, investments);
    updateInsights();
});