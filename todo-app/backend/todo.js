const express = require('express')
const router = express.Router();

const database = require('./database.js')
var client = database.client
let startDB = database.startDB
let queryDB = database.queryDB

const newTodos = router.post('/', (req, res) => {
    var newTodo = req.body.todo
    console.log(`New todo request: ${newTodo}`)
    if (!newTodo || newTodo.trim() == ""|| newTodo.length > 140) {
        console.log(`Non allowed todo request: ${newTodo}`)
        res.sendStatus(400) 
    }
    else {
        newTodo = newTodo.trim()
        console.log(`New todo: ${newTodo}`)
        addTodo(newTodo)
        res.sendStatus(200)
    }
})

const addTodo = (todo) => {
    const insertQuery = `INSERT INTO todos(todo, done) values('${todo}', 0);`
    if (!queryDB(insertQuery)) {
        console.log("Failed to insert new todo")
    } else console.log("Inserted todo")
}

const getTodos = router.get('/', async function(req, res) {
    console.log('Requesting todos')
    await fetchTodos(res)
})

const getTodosDone = router.get('/done', async function(req, res) {
    console.log('Requesting done todos')
    await fetchDoneTodos(res)
})

const updateTodo = router.put('/:todoID', function (req, res) {
    var todoID = req.params.todoID
    console.log(`Todo id: ${todoID}`)
    const updateQuery = `UPDATE todos SET done = 1 WHERE id=${todoID}`
    if (!queryDB(updateQuery)) {
        console.log("Failed to update todo")
        res.status(500)
        res.send("Fail")
    } else { 
        console.log("Updated todo to done") 
        res.status(200)
        res.send("OK")
    }
})

const fetchTodos = (res) => {
    client.connect()
    .then(() => console.log("Connected to db"))
    .catch(err => console.log("Maybe already connected to db"))

    console.log("Getting todos")
    const getQuery = "SELECT * FROM todos WHERE done = 0;"
    client.query(getQuery, (error, response) => {
        console.log("Got todos")
        if (error) throw error.stack
        const rows = response.rowCount
        var todos = []
        
        
        for (var i = 0; i < rows; i++) {
            todos.push({id: response.rows[i].id, todo: response.rows[i].todo})
        }

        res.send(JSON.stringify(todos))
        console.log('Delivered todos')
    })
}

const fetchDoneTodos = (res) => {
    client.connect()
    .then(() => console.log("Connected to db"))
    .catch(err => console.log("Maybe already connected to db"))

    console.log("Getting done todos")
    const getQuery = "SELECT * FROM todos WHERE done = 1;"
    client.query(getQuery, (error, response) => {
        console.log("Got todos that are done")
        if (error) throw error.stack
        const rows = response.rowCount
        var todos = []

        for (var i = 0; i < rows; i++) {
            todos.push({id: response.rows[i].id, todo: response.rows[i].todo})
        }

        res.send(JSON.stringify(todos))
        console.log('Delivered done todos')
    })
}

module.exports = {
    newTodos,
    getTodos,
    getTodosDone,
    updateTodo
}
