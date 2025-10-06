// Select elements
let input = document.getElementById('taskInput');
let addBtn = document.getElementById('add');
let clearBtn = document.getElementById('clear');
let ulElm = document.getElementById('taskList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Add button
addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearTodo);

function addTodo() {
  if (input.value.trim() === '') return;
  todos.push({ name: input.value, status: 'doing' });
  localStorage.setItem('todos', JSON.stringify(todos));
  input.value = '';
  createTodo();
}

// Clear all todos
function clearTodo() {
  todos = [];
  ulElm.innerHTML = '';
  localStorage.removeItem('todos');
}

// Create Todo List
function createTodo() {
  ulElm.innerHTML = '';

  todos.forEach(function (todo) {
    let newLi = document.createElement('li');
    newLi.className = 'liList';

    let newSpan = document.createElement('span');
    newSpan.className = 'listSpan';
    newSpan.innerHTML = todo.name;

    //  Style based on status
    if (todo.status === 'done') {
      newSpan.style.textDecoration = 'line-through';
      newSpan.style.color = 'gray';
    } else {
      newSpan.style.textDecoration = 'none';
      newSpan.style.color = 'black';
    }

    // Complete button
    let newcomBtn = document.createElement('button');
    newcomBtn.className = 'complete';
    newcomBtn.innerHTML = todo.status === 'doing' ? 'Complete' : 'Undo';
    newcomBtn.addEventListener('click', function () {
      let index = todos.findIndex((item) => item.name === todo.name);
      if (index !== -1) {
        todos[index].status =
          todos[index].status === 'doing' ? 'done' : 'doing';
        localStorage.setItem('todos', JSON.stringify(todos));
        createTodo();
      }
    });

    // Delete button
    let newDelBtn = document.createElement('button');
    newDelBtn.className = 'delete';
    newDelBtn.innerHTML = 'Delete';
    newDelBtn.addEventListener('click', function () {
      let index = todos.findIndex((item) => item.name === todo.name);
      if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        createTodo();
      }
    });

    // Append all
    newLi.append(newSpan, newcomBtn, newDelBtn);
    ulElm.append(newLi);
  });
}

// Load todos when page reloads
window.addEventListener('load', createTodo);
