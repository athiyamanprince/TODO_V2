const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-button');
const saveButton = document.querySelector('#save-button');
const todoList = document.querySelector('#todo-list');

let todos = [];

function renderTodos() {
  // Clear the current list of to-dos
  todoList.innerHTML = '';

  // Render each to-do as an li element
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement('li');
    li.innerHTML = `<span>${todo}</span>
                    <button class="edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete-button"><i class="fa-solid fa-trash"></i></button>`;
    todoList.appendChild(li);

    // Add event listener to edit button
    const editButton = li.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
      editTodo(i);
    });

    // Add event listener to delete button
    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
      deleteTodoConfirmation(i);
    });
  }
}

function addTodo(e) {
    e.preventDefault();
  const todoText = input.value.trim();

  // Check if todoText is empty or already exists
  if (todoText === '') {
    alert('Please enter a to-do.');
    return;
  }
  if (todos.includes(todoText)) {
    alert('This to-do already exists.');
    return;
  }

  // Add the new to-do to the list
  todos.push(todoText);

  // Render the updated list of to-dos
  renderTodos();

  // Clear the input field
  input.value = '';

  // Send a toast message
  showToast('To-do added successfully.');
}

function editTodo(index) {
  // Get the current todo text and set the input value
  const todoText = todos[index];
  input.value = todoText;

  // Hide the add button and show the save button
  addButton.style.display = 'none';
  saveButton.style.display = 'inline-block';

  // Remove any existing event listener from the save button
  saveButton.removeEventListener('click', saveTodo);

  // Add a new event listener to save the updated todo
  function saveTodo() {
    const newTodoText = input.value.trim();

    // Check if newTodoText is empty or already exists
    if (newTodoText === '') {
      alert('Please enter a new to-do.');
      return;
    }
    if (todos.includes(newTodoText)) {
      alert('This to-do already exists.');
      return;
    }

    // Update the to-do and render the updated list
    todos[index] = newTodoText;
    renderTodos();

    // Reset the input field and buttons
    input.value = '';
    addButton.style.display = 'inline-block';
    saveButton.style.display = 'none';

    // Send a toast message
    showToast('To-do updated successfully.');
  }

  saveButton.addEventListener('click', saveTodo);
}

function deleteTodoConfirmation(index) {
  if (confirm('Are you sure you want to delete this to-do?')) {
    deleteTodo(index);
  }
}

function deleteTodo(index) {
  // Remove the to-do from the list and render the updated list
  todos.splice(index, 1);
  renderTodos();

  // Send a toast message
  showToast('To-do deleted successfully.');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}

// Load the list of to-dos from local storage

const storedTodos = localStorage.getItem('todos');
if (storedTodos) {
todos = JSON.parse(storedTodos);
}

// Render the initial list of to-dos
renderTodos();

// Add event listener to the add button
addButton.addEventListener('click', addTodo);

// Add event listener to the input field to enable adding to-do by pressing enter key
input.addEventListener('keyup', (event) => {
if (event.key === 'Enter') {
addTodo();
}
});

// Save the list of to-dos to local storage on window unload
window.addEventListener('unload', () => {
localStorage.setItem('todos', JSON.stringify(todos));
});
