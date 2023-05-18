// Get DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const deleteAllButton = document.getElementById('delete-all-button');

// Add event listener to form submission
todoForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input value
  const todoText = todoInput.value.trim();

  // If input is not empty
  if (todoText !== '') {
    // Create new todo item container
    const todoItemContainer = document.createElement('li');
    todoItemContainer.classList.add('todo-item');
    todoItemContainer.style.opacity = 0;

    // Create new todo item text
    const todoItemText = document.createElement('span');
    todoItemText.innerText = `${getTaskNumber()}. ${todoText}`; // Add task number to the text

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Add event listener to remove the task
    removeButton.addEventListener('click', function() {
      todoItemContainer.remove();
      resetTaskNumbers();
    });

    // Append the text and remove button to the todo item container
    todoItemContainer.appendChild(todoItemText);
    todoItemContainer.appendChild(removeButton);

    // Append the todo item container to the list with a sliding down transition
    todoList.appendChild(todoItemContainer);
    setTimeout(function() {
      todoItemContainer.style.opacity = 1;
    }, 10);

    // Clear input value
    todoInput.value = '';
  }
});

// Function to get the current task number
function getTaskNumber() {
  const todoItems = todoList.querySelectorAll('.todo-item');
  return todoItems.length + 1;
}

// Function to reset task numbers
function resetTaskNumbers() {
  const todoItems = todoList.querySelectorAll('.todo-item');
  todoItems.forEach((item, index) => {
    const taskNumber = index + 1;
    const todoItemText = item.querySelector('span');
    todoItemText.innerText = `${taskNumber}. ${todoItemText.innerText.slice(3)}`;
  });
}

// Add event listener to delete all button
deleteAllButton.addEventListener('click', function() {
  const todoItems = todoList.querySelectorAll('.todo-item');
  todoItems.forEach(item => {
    item.style.animation = 'fadeOutAnimation 0.5s forwards';
    setTimeout(() => {
      item.remove();
      resetTaskNumbers();
    }, 500);
  });
});
