
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

const transactionList = document.getElementById("transaction-list");

function updateDisplay() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactionList.innerHTML = "";

    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

        let li = document.createElement("li");

        let details = document.createElement("span");
        details.textContent =
            transaction.description + " (" + transaction.category + ")";

        let amount = document.createElement("span");
        amount.textContent =
            (transaction.type === "income" ? "+" : "-") +
            "₹" + transaction.amount.toFixed(2);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteTransaction(i);
        });

        li.appendChild(details);
        li.appendChild(amount);
        li.appendChild(deleteButton);

        transactionList.appendChild(li);
    }

    document.getElementById("income").textContent =
        "₹" + totalIncome.toFixed(2);

    document.getElementById("expense").textContent =
        "₹" + totalExpense.toFixed(2);

    document.getElementById("balance").textContent =
        "₹" + (totalIncome - totalExpense).toFixed(2);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let description = descriptionInput.value.trim();
    let amount = Number(amountInput.value);
    let type = typeInput.value;
    let category = categoryInput.value;

    if (description === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    let transaction = {
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    updateDisplay();

    form.reset();
});

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateDisplay();
}

updateDisplay();
