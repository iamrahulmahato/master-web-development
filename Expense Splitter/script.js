let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const desc = document.getElementById("expenseDesc").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const date = document.getElementById("expenseDate").value;
  const note = document.getElementById("expenseNote").value;

  if (!desc || isNaN(amount) || amount <= 0 || !date) {
    showPopup("Please fill in all fields with valid values.");
    return;
  }

  const expense = { desc, amount, date, note };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();

  document.getElementById("expenseDesc").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDate").value = "";
  document.getElementById("expenseNote").value = "";
  showPopup("Expense added successfully!");
}

function renderExpenses() {
  const expenseList = document.getElementById("expenseList");
  const expenseTitle = document.getElementById("expenseTitle");
  const calculateBtn = document.getElementById("calculateBtn");

  expenseList.innerHTML = "";

  if (expenses.length > 0) {
    expenseTitle.style.display = "block";
    calculateBtn.style.display = "block";
  } else {
    expenseTitle.style.display = "none";
    calculateBtn.style.display = "none";
  }

  expenses.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("expense-item");

    const details = document.createElement("div");
    details.classList.add("expense-details");
    details.innerHTML = `
      <strong>${expense.desc}</strong>
      <span>${expense.date}</span>
      <span>₹${expense.amount.toFixed(2)}</span>
      ${expense.note ? `<p>Note: ${expense.note}</p>` : ""}
    `;

    const actions = document.createElement("div");
    actions.classList.add("expense-actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editExpense(index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteExpense(index);

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    listItem.appendChild(details);
    listItem.appendChild(actions);
    expenseList.appendChild(listItem);
  });
}

function editExpense(index) {
  const expense = expenses[index];

  document.getElementById("expenseDesc").value = expense.desc;
  document.getElementById("expenseAmount").value = expense.amount;
  document.getElementById("expenseDate").value = expense.date;
  document.getElementById("expenseNote").value = expense.note;

  deleteExpense(index);
  showPopup("Edit the expense details and add again to save.");
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  showPopup("Expense deleted successfully.");
}

function calculateSplit() {
  const numPeople = parseInt(document.getElementById("numPeople").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(numPeople) || numPeople <= 0) {
    showPopup("Please enter a valid number of people.");
    return;
  }

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (totalAmount === 0) {
    resultDiv.textContent = "No expenses to split.";
    resultDiv.style.display = "block";
    return;
  }

  const splitAmount = totalAmount / numPeople;

  resultDiv.textContent = `Total Expenses: ₹${totalAmount.toFixed(
    2
  )}\nEach person should pay: ₹${splitAmount.toFixed(2)}`;
  resultDiv.style.display = "block";
}

function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = "0";
  }, 2500);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

document.addEventListener("DOMContentLoaded", renderExpenses);
