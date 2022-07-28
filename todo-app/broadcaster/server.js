const axios = require("axios")
const express = require('express')

let app = express()
let port = process.env.BROADCASTERPORT || 8092
app.use(express.json())

const botToken = process.env.TELEGRAM_TOKEN.toString()

function postTelegram(message) {
    console.log("Posting to telegram:", message)

    var url = `https://api.telegram.org/bot${botToken}/sendMessage`
    axios.post(url, {
        chat_id: process.env.TELEGRAM_ID.toString(),
        text: message
    })
    .then(function (response) {
        if (response.statusCode == "200") console.log("OK")
    })
    .catch(function (error) {
        console.log(error);
    })
}

app.post('/update', function(req,res) {
    console.log('New update request')
    console.log(req.body)
    
    var newTodo = req.body.newTodo
    var todo = req.body.todo
    var done = req.body.done
    
    if (!todo) { 
        res.status(500).send("NOT OK")
    }   
    
    console.log(newTodo)

    var message = ""
    if (newTodo == "true") {
        message = `New todo has been created:\n${todo}`
    }

    if (done == "true") {
        message = `Todo has been completed:\n${todo}`
    }

    postTelegram(message)
    res.send('OK')

})
    
app.listen(port, function() {
    console.log(`Server started in port: ${port}`)
})
