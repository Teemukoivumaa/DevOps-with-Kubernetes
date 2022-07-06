const express = require('express');
const path = require('path')
const fs = require('fs')
const readLastLines = require('read-last-lines');
const axios = require('axios')
const router = express.Router();

let app = express();
let port = process.env.PORT || 8080;
app.use(express.json());

const pingPong = require('./pingPongs.js');
var pingPongRouter = pingPong.router
var pingPongs = pingPong.returnPingPongs

app.use('/pingPongs', pingPongRouter);

// -----------------------

var timestampedText = ""
var pingpongText = ""

async function randomText() {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    
    let date = new Date()
    let timestamp = date.toISOString().slice(0, -5)
    timestamp = timestamp.replace('T', ' ')

    timestampedText = `${timestamp} : ${randomString}`;
    console.log(timestampedText);
    
    pingpongText = `Ping / Pongs: ${pingPongs()}`
    console.log(pingpongText);
    setTimeout(randomText, 5000);
}

app.get('/', function(req, res) {
    console.log("Getting status");
    res.send
        (
        `
        </br> </br>
        <h2>${process.env.MESSAGE}</h2>
        <h2>${timestampedText}</h2>
        <h2>${pingpongText}</h2>
        `
        )
});

app.listen(port, function () {
    console.log("Server started in port: " + port);
});

randomText()
