// Load expenses from local storage
document.addEventListener('DOMContentLoaded', function () {
    loadExpenses();
  });
  
  // Function to add an expense
  function addExpense() {
    const amountInput = document.getElementById('expense-amount');
    const descriptionInput = document.getElementById('expense-description');
    const categoryInput = document.getElementById('expense-category');
    const expensesList = document.getElementById('expenses');
  
    const amount = amountInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;
  
    if (amount === '' || description === '' || category === '') {
      alert('Please fill in all fields.');
      return;
    }
  
    const expense = { amount, description, category };
  
    // Save to local storage
    saveExpense(expense);
  
    // Clear input fields
    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
  
    // Add the expense to the list
    addExpenseToList(expense, expensesList);
  }
  
  // Function to save an expense to local storage
  function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  
  // Function to load expenses from local storage
  function loadExpenses() {
    const expensesList = document.getElementById('expenses');
    expensesList.innerHTML = '';
  
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach((expense, index) => {
      addExpenseToList(expense, expensesList, index);
    });
  }
  
  // Function to add an expense to the list
  function addExpenseToList(expense, list, index) {
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
  
    const expenseInfo = document.createElement('span');
    expenseInfo.innerHTML = `Amount: $${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;
  
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.innerHTML = 'Edit';
    editButton.onclick = function () {
      editExpense(index);
    };
  
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function () {
      deleteExpense(index);
    };
  
    expenseItem.appendChild(expenseInfo);
    expenseItem.appendChild(editButton);
    expenseItem.appendChild(deleteButton);
  
    if (typeof index !== 'undefined') {
      // Add with index (editing mode)
      list.insertBefore(expenseItem, list.childNodes[index]);
    } else {
      // Add without index (normal mode)
      list.appendChild(expenseItem);
    }
  }
  
  // Function to edit an expense
  function editExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    const editedExpense = expenses[index];
  
    // Set the input fields with the edited expense details
    const amountInput = document.getElementById('expense-amount');
    const descriptionInput = document.getElementById('expense-description');
    const categoryInput = document.getElementById('expense-category');
  
    amountInput.value = editedExpense.amount;
    descriptionInput.value = editedExpense.description;
    categoryInput.value = editedExpense.category;
  
    // Remove the edited expense from the list
    const expensesList = document.getElementById('expenses');
    expensesList.removeChild(expensesList.childNodes[index]);
  
    // Remove the edited expense from local storage
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  
  // Function to delete an expense
  function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
  
    // Remove the expense from the list
    const expensesList = document.getElementById('expenses');
    expensesList.removeChild(expensesList.childNodes[index]);
  
    // Remove the expense from local storage
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  