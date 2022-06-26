const express = require('express')
const router = express.Router();

var todos = ["Complete exercise 2.01", "Test functionality"]

const newTodos = router.post('/', (req, res) => {
    var newTodo = req.body.todo
    if (!newTodo || newTodo.trim() == "") res.sendStatus(400)
    else {
        newTodo = newTodo.trim()
        console.log(`New todo: ${newTodo}`)
        todos.push(newTodo)
        res.sendStatus(200)
    }
})

const getTodos = router.get('/', (req, res) => {
    console.log('Requesting todos')

    res.send(JSON.stringify(todos))
})

module.exports = {
    newTodos,
    getTodos
}
