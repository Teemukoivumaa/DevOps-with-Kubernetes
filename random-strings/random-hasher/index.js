const express = require('express');
const path = require('path')
const fs = require('fs')
const readLastLines = require('read-last-lines');
const axios = require('axios')
const router = express.Router();

//const dir = path.join('/', 'usr', 'src', 'app', 'files')
const dir = path.join('./')
const filePath = path.join(dir, 'log.txt')

let app = express();
let port = process.env.PORT || 8080;
app.use(express.static(dir));
app.use(express.json());

const pingPong = require('./pingPongs.js');
var pingPongRouter = pingPong.router
var pingPongs = pingPong.returnPingPongs

app.use('/pingPongs', pingPongRouter);

// -----------------------

var timestampedText = ""
var pingpongText = ""

const readFilesLastLine = (path) => {
    return readLastLines.read(path, 1)
        .then((line) => { return line });
}

async function randomText() {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    
    let timestamp = "Test"//await readFilesLastLine(filePath)
    timestampedText = `${timestamp} : ${randomString}`;
    console.log(timestampedText);
    
    pingpongText = `Ping / Pongs: ${pingPongs()}`
    console.log(pingpongText);
    setTimeout(randomText, 5000);
}

app.get('/status', function(req, res) {
    console.log("Getting status");
    res.send
        (
        `
        </br> </br>
        <h2>${timestampedText}</h2>
        <h2>${pingpongText}</h2>
        `
        )
});

app.listen(port, function () {
    console.log("Server started in port: " + port);
});

randomText()
