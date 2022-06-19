var express = require('express');
let app = express();
var port = process.env.PORT || 8080;

var pongs = 0;

app.get('/pong', function(req, res) {
    pongs += 1;
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
