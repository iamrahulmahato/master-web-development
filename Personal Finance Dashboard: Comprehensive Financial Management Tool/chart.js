// chart.js

// Function to render all charts
function renderCharts(expenses, monthlyBudget, savingsGoals, investments) {
    // Budget Chart
    const budgetChart = new Chart(document.getElementById('budgetChart'), {
        type: 'doughnut',
        data: {
            labels: ['Spent', 'Remaining'],
            datasets: [{
                data: [expenses.reduce((sum, expense) => sum + expense.amount, 0), monthlyBudget - expenses.reduce((sum, expense) => sum + expense.amount, 0)],
                backgroundColor: ['#FF6384', '#36A2EB'],
            }]
        }
    });

    // Expense Chart
    const expenseChart = new Chart(document.getElementById('expenseChart'), {
        type: 'pie',
        data: {
            labels: expenses.map(e => e.category),
            datasets: [{
                data: expenses.map(e => e.amount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            }]
        }
    });

    // Savings Goal Chart
    const goalChart = new Chart(document.getElementById('goalChart'), {
        type: 'bar',
        data: {
            labels: savingsGoals.map(g => g.name),
            datasets: [{
                data: savingsGoals.map(g => g.amount),
                backgroundColor: '#4BC0C0',
            }]
        }
    });

    // Investment Chart
    const investmentChart = new Chart(document.getElementById('investmentChart'), {
        type: 'pie',
        data: {
            labels: investments.map(i => i.name),
            datasets: [{
                data: investments.map(i => i.value),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        }
    });
}

// Export the renderCharts function
export { renderCharts };