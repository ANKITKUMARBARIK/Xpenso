document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.querySelector('#expense-form')
    const expenseNameInput = document.querySelector('#expense-name')
    const expenseAmountInput = document.querySelector('#expense-amount')
    const expenseList = document.querySelector('#expense-list')
    const totalAmountDisplay = document.querySelector('#total-amount')

    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    let totalAmount = calculateTotal()

    renderExpenses()

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value.trim())
        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            }
            expenses.push(newExpense)
            saveExpensesTolocal()
            renderExpenses()
            updateTotal()

            // clear input
            expenseNameInput.value = ""
            expenseAmountInput.value = ""
        }
    })

    function renderExpenses() {
        expenseList.innerHTML = ""
        expenses.forEach((expense) => {
            const li = document.createElement('li')
            li.innerHTML = `${expense.name} - $${expense.amount} <button data-id="${expense.id}">Delete</button>`
            expenseList.appendChild(li)
        })
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    }

    function saveExpensesTolocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

    function updateTotal() {
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed(2)
    }

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const expenseId = parseInt(e.target.getAttribute("data-id"))
            expenses = expenses.filter((expense) => expense.id !== expenseId)
            saveExpensesTolocal()
            renderExpenses()
            updateTotal()
        }
    })
})