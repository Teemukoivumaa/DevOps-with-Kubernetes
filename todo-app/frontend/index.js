async function getTodos() {
    const response = await fetch('/getTodos', {
        method: 'GET',
        mode: 'no-cors',
    })
    
    if (response.status == "200") {
        return response.json()
    }
}

async function getDoneTodos() {
    const response = await fetch('/getTodos/done', {
        method: 'GET',
        mode: 'no-cors',
    })

    if (response.status == "200") {
        return response.json()
    }
}

async function addTodo(newTodo) {
    const response = await fetch('/newTodo', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({todo:`${newTodo}`})
    })

    if (response.status != "200") {
        console.log(response)
    } else createTodoList()
}

async function addAsDone(id) {
    const response = await fetch('/updateTodo', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({todoID:`${id}`})
    })

    if (response.status != "200") {
        console.log(response)
    } else createTodoList()
}

var undoneTodos = []
var doneTodos = []

async function createTodoList() {
    let todos = await getTodos()
    if (todos) {
        undoneTodos = todos
        var todoList = document.getElementById("todo-list");
        todoList.innerHTML = ""
        
        var list = "<ul>"
        for (let todo of todos) {
            list = list.concat(`\n<li id='${todo.id}' onClick='addAsDone(${todo.id})' >${todo.todo}</li>`)
        }
        list.concat("</ul>")
        
        todoList.innerHTML = list
    }
    
    let todosDone = await getDoneTodos()
    
    if (todosDone) {
        doneTodos = todosDone
        var todoList = document.getElementById("doneTodo-list");
        todoList.innerHTML = ""

        var list = "<ul>"
        for (let todo of todosDone) {
            list = list.concat(`\n<li><del>${todo.todo}</del></li>`)
        }
        list.concat("</ul>")

        todoList.innerHTML = list
    }
}

function buttonPress() {
    var newTodo = document.getElementById('todo-input').value
    addTodo(newTodo)
}
