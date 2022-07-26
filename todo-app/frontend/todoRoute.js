const express = require('express')
const router = express.Router();
const axios = require('axios')

const addTodo = router.post('/', (req, res) => {
    if (req.body.todo) {
        let newTodo = req.body.todo
        console.log(`New todo to forward: "${newTodo}"`)
        axios.post('http://todo-backend-svc:2346/todos', {
            todo: `${newTodo}`
        })
        .then(function (response) {
            if (response.status == 200) res.sendStatus(200)
            else console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
})

const getTodos = router.get('/', async function(req, res) {
    console.log("Forwarding request to get todos")
    const response = await axios.get('http://todo-backend-svc:2346/todos')
    res.send(JSON.stringify(response.data))
    console.log("Returned todos")
})

const getDoneTodos = router.get('/done', async function(req, res) {
    console.log("Forwarding request to get done todos")
    const response = await axios.get('http://todo-backend-svc:2346/todos/done')
    res.send(JSON.stringify(response.data))
    console.log("Returned done todos")
})

module.exports = {
    addTodo,
    getTodos,
    getDoneTodos
}
