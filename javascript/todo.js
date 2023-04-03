/**
 * Function that adds eventlistener to the todo form and call the showTodoFunction.
 */
function initTodos() {
    const todoForm = document.querySelector('.todo-form');
    todoForm.addEventListener('submit', addTodo)
    showTodoList();
}

/**
 * Edit a todo item
 * @param {number} id - The ID of the todo item to edit
 */
function editTodo(id) {
    // Find the todo with the matching id in the todos array
    const todoToEdit = todos.find(todo => todo.id === id);
    const index = todos.findIndex(todo => todo.id === id);
    const todoForm = document.querySelector(".todo-form");
    const dateInputField = document.querySelector(".add-todo-date");
    const todoInputField = document.querySelector(".todo-input");
   
    // Set the value of date input to the value of the chosen todo
    dateInputField.value = todoToEdit.date;
  
    // Set the value of the input field to the value of the chosen todo
    todoInputField.value = todoToEdit.text;
  
    todoForm.removeEventListener('submit', addTodo);
    // Add a click event listener to the edit button
    todoForm.addEventListener("submit", function setEdit() {

        todoToEdit.text = todoInputField.value;
        todoToEdit.date = dateInputField.value;
        
        todos.splice(index, 1, todoToEdit);
  
      // Save the updated todos array to local storage
      addToLocalStorage(todos);
      getFromLocalStorage()
  
      // Show the updated todo list
      showTodoList();

      todoForm.removeEventListener('submit', setEdit);
      todoForm.addEventListener('submit', addTodo);

    });
  }

/**
 * Adds a todo to the todos array and updates the todo list in the DOM.
 * @param {Event} event - The submit event.
 * @returns {Object} The added todo object.
 */

function addTodo (event) {
    const todoInput = document.querySelector('.todo-input');
    const dateInput = document.querySelector('.add-todo-date');

    const dateValue = dateInput.value;

    // Prevent default behaviour of our submit
    event.preventDefault();

    // InputValue is equal to what the user types in
    const inputValue = todoInput.value;
    
    // If there is an input value create todo object
    if (inputValue && dateValue) {

        const todo = {
            id: Date.now(),
            text: inputValue,
            date: dateValue
        }

        // Add object to the array
        todos.push(todo);
        addToLocalStorage();
        showTodoList();
    }
    
    // Clear input field and date input
    todoInput.value = "";
    dateInput.value = "";
    return todo;
}

/**
 * Function to display all todos in the list
 */
function showTodoList() {
    // Gets elements from DOM
    const todoList = document.querySelector('.todo-list')
    const todoRight = document.querySelector(".todo-right");
    
    // Empty list
    todoList.innerHTML = "";

    todos.forEach (todo => {
        // Create new list item with everything that 
        // is in it and add class names
        const newTodoItem = document.createElement('li');
        const newTodoTextItem = document.createElement('span');
        const newTodoTextItemDate = document.createElement('span');
        const todoRight = document.createElement('div');
        const todoEdits = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');
        const editBtnIcon = document.createElement('i');
        const deleteBtnIcon = document.createElement('i');
        newTodoItem.classList.add('todo-item');
        newTodoTextItem.classList.add('todo-text');
        todoEdits.classList.add('todo-edits');
        todoRight.classList.add('todo-right');
        deleteBtn.classList.add('delete-todo');
        deleteBtn.dataset.cy = 'delete-todo-button';
        editBtn.dataset.cy = 'edit-todo-button';
        deleteBtn.addEventListener ('click', () => deleteTodo(todo.id));
        editBtn.addEventListener("click", () => editTodo(todo.id));
        editBtn.classList.add('edit-todo');
        deleteBtnIcon.classList.add('fa-solid', 'fa-trash-can');
        editBtnIcon.classList.add('fa-regular', 'fa-pen-to-square');

        // Add the new list item to list
        todoList.appendChild(newTodoItem);
        newTodoItem.appendChild(newTodoTextItem);
        newTodoItem.appendChild(todoRight);
        todoRight.appendChild(newTodoTextItemDate);
        todoRight.appendChild(todoEdits);
        todoEdits.appendChild(deleteBtn);
        todoEdits.appendChild(editBtn);
        deleteBtn.appendChild(deleteBtnIcon);
        editBtn.appendChild(editBtnIcon);
        
        // Add object id to data attribute on list item
        newTodoItem.dataset.key = todo.id
        
        // Add text value to list item
        newTodoTextItem.innerText = todo.text;

        // Add date to todo item
        newTodoTextItemDate.innerText = todo.date;

        // Add eventlistender to delete button
        deleteBtn.addEventListener('click', deleteTodo)
    });
    showTodosInCalendar(monthNr, year)
}

/**
 * Delete a todo item
 * @param {number} id - The ID of the todo item to edit
 */
function deleteTodo(id) {
    // Uppdate state in application
    todos = todos.filter(todo => todo.id != id)

    // Save the updated array of objects
    addToLocalStorage();
    showTodoList();
    showTodosInCalendar(monthNr, year)
}

// Add to local storage
const addToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Get from local storage
const getFromLocalStorage = () => {
    todos = JSON.parse(localStorage.getItem('todos') || "[]");
}