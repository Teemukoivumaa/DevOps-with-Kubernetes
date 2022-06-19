const path = require('path')
const fs = require('fs')

const dir = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(dir, 'pongs.txt')

var express = require('express');
let app = express();
var port = 8081;

var pongs = 0;

const writeToFile = () => {
    console.log("Writing to file")
    fs.appendFile(filePath, "\n"+pongs, function (err) {
        if (err) throw err;
    });
}

writeToFile()

app.get('/pong', function(req, res) {
    pongs += 1;
    writeToFile()
    console.log("Pongd");
    res.send
        (
        ` 
        </br> </br>
        <h2>pong ${pongs}</h2>
        `
        )
});

app.listen(port, function () {
    console.log("Server started in port: " + port);
});
