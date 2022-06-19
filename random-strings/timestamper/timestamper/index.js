var express = require('express');
let app = express();
var port = process.env.PORT || 8080;

var timestampedText = "";

const randomText = () => {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    let date = new Date();
    
    let timestamp = date.toISOString().slice(0, -5);
    timestamp = timestamp.replace('T', ' ')
    
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

app.get('/', function(req, res) {
    console.log("Site pinged");
    res.send
        (
        ` 
        </br> </br>
        <h2>Hello World!</h2>
        `
        )
});

app.listen(port, function () {
    console.log("Server started in port: " + port);
});

randomText();
