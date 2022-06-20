const express = require('express');
const path = require('path')
const fs = require('fs')
const readLastLines = require('read-last-lines');

let app = express();
var port = process.env.PORT || 8080;

const dir = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(dir, 'log.txt')
const pingPongFilePath = path.join(dir, 'pongs.txt')

var timestampedText = ""
var pingpongText = ""

const readFilesLastLine = (path) => {
    return readLastLines.read(path, 1)
        .then((line) => { return line });
}

async function randomText () {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    
    let timestamp = await readFilesLastLine(filePath)
    timestampedText = `${timestamp} : ${randomString}`;
    console.log(timestampedText);
    
    let pingpongs = await readFilesLastLine(pingPongFilePath)
    pingpongText = `Ping / Pongs: ${pingpongs}`
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

randomText();
