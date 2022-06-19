const express = require('express');
const path = require('path')
const fs = require('fs')
const readLastLines = require('read-last-lines');

let app = express();
var port = process.env.PORT || 8080;

const dir = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(dir, 'log.txt')

var timestampedText = ""

const readTimestamp = () => {
    return readLastLines.read(filePath, 1)
        .then((line) => { return line });
}

async function randomText () {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    
    let timestamp = await readTimestamp()
    timestampedText = `${timestamp} : ${randomString}`;
    console.log(timestampedText);

    setTimeout(randomText, 5000);
}

app.get('/status', function(req, res) {
    console.log("Getting status");
    res.send
        (
        ` 
        </br> </br>
        <h2>${timestampedText}</h2>
        `
        )
});

app.listen(port, function () {
    console.log("Server started in port: " + port);
});

randomText();
