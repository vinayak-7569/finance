let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateBudget() {
    let income = document.getElementById("income").value || 0;
    let totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    document.getElementById("totalExpenses").innerText = totalExpenses;
    document.getElementById("remainingBudget").innerText = income - totalExpenses;
}

function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = parseFloat(document.getElementById("expenseAmount").value);

    if (name && amount) {
        expenses.push({ name, amount });
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses();
        updateBudget();
    } else {
        alert("Please provide both name and amount for the expense.");
    }
}

function displayExpenses() {
    let list = document.getElementById("expenseList");
    list.innerHTML = "";
    expenses.forEach((e, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${e.name}: $${e.amount} <button onclick="removeExpense(${index})">Remove</button>`;
        list.appendChild(li);
    });
}

function removeExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateBudget();
}

// Load expenses and budget when the page loads
displayExpenses();
updateBudget();
