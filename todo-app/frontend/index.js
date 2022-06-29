async function getTodos() {
    const response = await fetch('/getTodos', {
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

async function createTodoList() {
    let todos = await getTodos()
    
    if (todos) {
        var todoList = document.getElementById("todo-list");
        todoList.innerHTML = ""
        
        var list = "<ul>"
        for (let todo of todos) {
            list = list.concat(`\n<li>${todo}</li>`)
        }
        list.concat("</ul>")
        
        todoList.innerHTML = list
    }
}

function buttonPress() {
    var newTodo = document.getElementById('todo-input').value
    addTodo(newTodo)
}
