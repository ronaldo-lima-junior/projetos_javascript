// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// funções

const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;   
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    todo.appendChild(removeBtn);

    if(done) {
        todo.classList.add("done");
    };

    if(save){
        saveTodoLocalStorage({text, done});
    };

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;

            editTodoLocalStorage(oldInputValue, text);
        }
    });
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex";
        //vericando se NÃO tem o termo da pesquisa 
        if(!todoTitle.includes(search.toLowerCase())){
            todo.style.display = "none";
        }
    });
};

const getFilterTodo = (filter) => {
    const todos = document.querySelectorAll(".todo");
    switch(filter) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;
        
        case "done":    
            todos.forEach((todo) => 
                todo.classList.contains("done") ? (todo.style.display = "flex") : (todo.style.display = "none"));
            break;
        
        case "todo":    
            todos.forEach((todo) => 
            !todo.classList.contains("done") ? (todo.style.display = "flex") : (todo.style.display = "none"));
            break;
        
        default: break;
    }
};

// eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(!inputValue) return;

    saveTodo(inputValue);
});

document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");
    let todoTitle;

    if(parentElement && parentElement.querySelector("h3")){
        todoTitle = parentElement.querySelector("h3").innerText;
    };

    if(targetElement.classList.contains("finish-todo")){
        parentElement.classList.toggle("done");
        updateTodoLocalStorage(todoTitle);
    };

    if(targetElement.classList.contains("remove-todo")){
        parentElement.remove();
        removeTodoLocalStorage(todoTitle);
    }

    if(targetElement.classList.contains("edit-todo")){
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        toggleForms();
    }

});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);        
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    getFilterTodo(filterValue);
   
});

// Local Storage

const getTodoLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []; 

    return todos;
};

const loadTodoLocalStorage = () => {
    const todos = getTodoLocalStorage();
    todos.forEach(todo => {
        saveTodo(todo.text, todo.done, 0)
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodoLocalStorage();
    
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodoLocalStorage();

    const filteredTodos =  todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoLocalStorage = (todoText) => {
    const todos = getTodoLocalStorage();

    todos.map((todo) => todo.text === todoText ? todo.done = !todo.done : null);

    localStorage.setItem("todos", JSON.stringify(todos));
}

const editTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodoLocalStorage();

    todos.map((todo) => 
        todo.text === todoOldText ? todo.text = todoNewText : null);

    localStorage.setItem("todos", JSON.stringify(todos));
}

loadTodoLocalStorage();