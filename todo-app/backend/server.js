const express = require('express')
const cors = require('cors')

let app = express()
var port = process.env.BACKENDPORT || 8091
app.use(express.static('./'));
app.use(express.json());
app.use(cors())

const todoBasics = require('./todo.js')
let todoPOST = todoBasics.newTodos
let todoGET = todoBasics.getTodos

app.use('/todos', todoPOST)
app.use('/todos', todoGET)

app.listen(port, function () {
    console.log("TODO-backend started in port: " + port);
})
