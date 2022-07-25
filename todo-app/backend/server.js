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

const database = require('./database.js')
let startDB = database.startDB
var healthy = false

app.get('/check', async function(req, res) {
    console.log("New health check")
    if (healthy) {
        res.status(200)
        res.send("OK")
        console.log("Health check OK")
    } else {
        var connectionToDB = await startDB()
        console.log(`Connected to DB? ${connectionToDB}`)
        if (connectionToDB) {
            res.status(200)
            res.send("OK")
            console.log("Health check OK")
            healthy = true
        }
        else {
            res.status(500)
            res.send("Error")
            console.log("Health check not OK")
            healthy = false
        }
    }
    console.log("")
})


app.listen(port, function () {
    console.log("TODO-backend started in port: " + port);
})
