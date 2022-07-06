const express = require('express')
const router = express.Router();

const database = require('./database.js')
const client = database.client
let startDB = database.startDB
let queryDB = database.queryDB

startDB()

const newTodos = router.post('/', (req, res) => {
    var newTodo = req.body.todo
    if (!newTodo || newTodo.trim() == "") res.sendStatus(400)
    else {
        newTodo = newTodo.trim()
        console.log(`New todo: ${newTodo}`)
        addTodo(newTodo)
        res.sendStatus(200)
    }
})

const addTodo = (todo) => {
    const insertQuery = `INSERT INTO todos(todo) values('${todo}');`
    console.log(insertQuery)
    if (!queryDB(insertQuery)) {
        console.log("Failed to insert new todo")
    } else console.log("Inserted todo")
}

const getTodos = router.get('/', async function(req, res) {
    console.log('Requesting todos')
    await fetchTodos(res)
})

const fetchTodos = (res) => {
    const getQuery = "SELECT * FROM todos;"
    client.query(getQuery, (error, response) => {
        if (error) throw error.stack
        const rows = response.rowCount
        var todos = []
        
        for (var i = 0; i < rows; i++) {  
            todos.push(response.rows[i].todo)
        }

        res.send(JSON.stringify(todos))
    })
}

module.exports = {
    newTodos,
    getTodos
}
