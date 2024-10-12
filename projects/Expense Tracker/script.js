let transactions = [];
let totalIncome = 0;
let totalExpenses = 0;
let balance = 0;

const categoryInput = document.getElementById('category-input');
const typeSelect = document.getElementById('type-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const transactionTableBody = document.getElementById('transaction-table-body');
const totalIncomeCell = document.getElementById('total-income');
const totalExpensesCell = document.getElementById('total-expenses');
const balanceElement = document.getElementById('balance');
const filterSelect = document.getElementById('filter-select');
const clearBtn = document.getElementById('clear-btn');

// Load transactions from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = savedTransactions;
    updateUI();
});

// Add new transaction
addBtn.addEventListener('click', function() {
    const category = categoryInput.value || 'Uncategorized';
    const type = typeSelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (!date) {
        alert('Please enter a valid date.');
        return;
    }

    const transaction = { id: generateID(), category, type, amount, date };
    transactions.push(transaction);

    // Save to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateUI();

    categoryInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
});

// Generate a random ID for transactions
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Update the UI with the transactions and balance
function updateUI() {
    transactionTableBody.innerHTML = '';
    totalIncome = 0;
    totalExpenses = 0;
    balance = 0;

    const filterType = filterSelect.value;

    transactions.forEach(transaction => {
        if (filterType === 'all' || filterType === transaction.type) {
            addTransactionToDOM(transaction);
        }

        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    balance = totalIncome - totalExpenses;

    totalIncomeCell.textContent = `INR${totalIncome.toFixed(2)}`;
    totalExpensesCell.textContent = `INR${totalExpenses.toFixed(2)}`;
    balanceElement.textContent = balance.toFixed(2);
}

// Add a transaction to the table in the DOM
function addTransactionToDOM(transaction) {
    const row = transactionTableBody.insertRow();

    row.insertCell(0).textContent = transaction.category;
    row.insertCell(1).textContent = transaction.type === 'income' ? 'Income' : 'Expense';
    row.insertCell(2).textContent = `$${transaction.amount.toFixed(2)}`;
    row.insertCell(3).textContent = transaction.date;

    const deleteCell = row.insertCell(4);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        deleteTransaction(transaction.id);
    });
    deleteCell.appendChild(deleteBtn);
}

// Delete a transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    // Save to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateUI();
}

// Filter transactions by type (all, income, or expense)
filterSelect.addEventListener('change', function() {
    updateUI();
});

// Clear all transactions
clearBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all transactions?')) {
        transactions = [];
        localStorage.removeItem('transactions');
        updateUI();
    }
});
