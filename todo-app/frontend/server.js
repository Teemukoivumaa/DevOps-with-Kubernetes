const express = require('express')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
let app = express()
let port = process.env.FRONTENDPORT || 8091

const dir = path.join('./')
app.use(express.static(dir));
app.use(express.json());

// Picture
var pictureDate = ""
var picturePath = ""
var pictureName = ""

const imageExists = async () => new Promise(res => {
    fs.stat(picturePath, (err, stats) => {
        if (err || !stats) return res(false)
        return res(true)
    })
})

async function downloadPicture() {
    console.log("Downloading picture")
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(picturePath))
    console.log("Todays picture downloaded")
}

const checkDate = () => {
    let date = new Date()
    let dateNow = date.toISOString().slice(0, -14)

    if (pictureDate != dateNow) {
        pictureDate = dateNow
        pictureName = `${pictureDate}.jpg`

        picturePath = path.join(dir, pictureName)
        console.log(`Picture path: ${picturePath}`)
    }
}

async function checkImage() {
    checkDate()
    console.log(`Checking if todays picture "${picturePath}" exists..`)
    
    if (await imageExists()) { console.log("Existed"); return }
    await downloadPicture()
}

const removeFile = async () => new Promise(res => fs.unlink(picturePath, (err) => res()))

app.get('/delete', async function(req, res) { await removeFile(); res.send("OK") })
// Picture

app.get('/', async function(req, res) {
    console.log("Site pinged")
    await checkImage()

    res.sendFile(path.join(__dirname, 'main.html'))

    console.log("-------------\n\n")
})

app.get('/index.js', function(req, res) { res.sendFile(path.join(__dirname, 'index.js')) })
app.get('/image.jpg', function(req, res) { res.sendFile(path.join(__dirname, picturePath)) })

const todoRoute = require('./todoRoute.js')
let addTodo = todoRoute.addTodo
let getTodos = todoRoute.getTodos
let getDoneTodos = todoRoute.getDoneTodos

app.use('/newTodo', addTodo)
app.use('/getTodos', getTodos)
app.use('/getTodos', getDoneTodos)
app.post('/updateTodo', async function(req, res) {
    console.log("Forwarding request to mark todo as done")

    var todoID = req.body.todoID
    if (todoID && todoID != null) {
        const response = await axios.put(`http://todo-backend-svc:2346/todos/${todoID}`)
        res.status(200)
        res.send("OK")
        console.log("Returning")
    } else {
        res.status(500)
        res.send("NOT OK")
    }
})

var health = false

app.get('/health', async function(req, res) {
    if (health) {
        res.status(200)
        res.send("OK")
        console.log("Health check to backend connection is ok")
    } else {
        console.log("Request health check")
        await axios.get('http://todo-backend-svc:2346/check')
        .then(function (response) {
            health = true
            console.log("Connection to backend ok")
            res.status(200)
            res.send("OK")
        })
        .catch(function (error) {
            health = false
            console.log(error)
            console.log("Connection to backend failed")
            res.status(500)
            res.send("Error")
        })
    }
})

app.listen(port, function () {
    console.log("Server started in port: " + port)
})

console.log("-------------\n\n")
