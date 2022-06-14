var express = require('express');
let app = express();
var port = process.env.PORT || 8080;

app.use(express.json());

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
