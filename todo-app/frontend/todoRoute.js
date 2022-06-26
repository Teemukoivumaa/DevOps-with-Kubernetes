const express = require('express')
const router = express.Router();
const axios = require('axios')

const route = router.post('/', (req, res) => {
    let newTodo = req.body.todo
    console.log(`New todo to route: "${newTodo}"`)
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
})

module.exports = route
