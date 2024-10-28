let transactions = [];
const transactionForm = document.getElementById('transaction-form');
const transactionTableBody = document.getElementById('transaction-table-body');
const totalIncomeDisplay = document.getElementById('total-income');
const totalExpensesDisplay = document.getElementById('total-expenses');
const netSavingsDisplay = document.getElementById('net-savings');
const ctx = document.getElementById('myChart').getContext('2d');

transactionForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const date = document.getElementById('transaction-date').value;
    const description = document.getElementById('transaction-description').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const type = document.getElementById('transaction-type').value;

    const transaction = {
        date,
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateTransactionTable();
    updateFinancialOverview();
    updateChart();
    transactionForm.reset();
});

function updateTransactionTable() {
    transactionTableBody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
        `;
        transactionTableBody.appendChild(row);
    });
}

function updateFinancialOverview() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const netSavings = totalIncome - totalExpenses;

    totalIncomeDisplay.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
    netSavingsDisplay.textContent = `$${netSavings.toFixed(2)}`;
}

function updateChart() {
    const labels = transactions.map(t => t.date);
    const incomeData = transactions.filter(t => t.type === 'income').map(t => t.amount);
    const expenseData = transactions.filter(t => t.type === 'expense').map(t => t.amount);

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: 'rgba(0, 127, 92, 0.5)',
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
