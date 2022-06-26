const express = require('express')
const axios = require('axios')

let app = express()
var port = 8085

var pongs = 0

const sendPingPongs = () => {    
    axios.post('http://random-strings-svc:2345/pingPongs', {
       pingPongs: `${pongs}`
    })
    .then(function (response) {
        if (response.data != 'OK') console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
}

app.get('/pong', function(req, res) {
    pongs += 1
    console.log("Pongd")

    res.send
        (
        ` 
        </br> </br>
        <h2>pong ${pongs}</h2>
        `
        )

    sendPingPongs()
})

app.listen(port, function () {
    console.log("Server started in port: " + port);
})
