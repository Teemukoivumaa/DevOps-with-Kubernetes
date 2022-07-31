const express = require('express')
const axios = require('axios')

const app = express()
var port = process.env.PORT || 8085

const password = process.env.POSTGRES_PASSWORD.toString()
const { Client } = require('pg');
var client = new Client({
    host: 'postgres-svc',
    user: 'postgres',
    database: 'postgres',
    password: password,
    port: 5432
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "pongs" (
        name VARCHAR(30) NOT NULL,
        count INT NOT NULL,
        PRIMARY KEY (name)
    );`
const initialValue = "INSERT INTO pongs (name, count) VALUES('pongcount', 0) ON CONFLICT DO NOTHING"
const countQuery = "SELECT count FROM pongs WHERE name = 'pongcount';"
const updateQuery = "UPDATE pongs SET count = count + 1 WHERE name = 'pongcount';"

async function queryDB(query) {
    try {
        await client.query(query)
        return true
    } catch (e) {
        console.log(e.stack)
        return false
    }
}

async function startDB() {
    client = new Client({
        host: 'postgres-svc',
        user: 'postgres',
        database: 'postgres',
        password: password,
        port: 5432
    });
    
    try {
        await client.connect()
        console.log("Connected to database")
    } catch(error) {
        console.log(error.stack)
        console.log("Couldn't connect to database")
        return false
    }
    
    if (!queryDB(createTableQuery)) {
        console.log("Couldn't create table to database")
        return false
    }
    console.log("Table was created")

    if(!queryDB(initialValue)) {
        console.log("Didn't insert initial values.")
    } else {
        console.log("Initial values added")
    }

    return true
}

const updateDB = () => {
    client.query(updateQuery, (error, response) => {
        if (error) throw error.stack;
        console.log("Added one pong.")
    });
}

const sendPingPongs = (pongs) => {
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

app.get('/', function(req, res) {
    console.log("New pong")
    client.query(countQuery, (error, response) => {
        if (error) throw error.stack
        console.log("Pongs:", response.rows[0].count)
        var pongs = response.rows[0].count
        res.send(
            `
            </br> </br>
            <h2>pong ${pongs}</h2>
            `)
        sendPingPongs(pongs)
    })
})

app.post('/add', function(req, res) {
    console.log("New pong request")
    updateDB()
    res.status(200)
    res.send("Success!")
})

var healthy = false

app.get('/check', async function(req, res) {
    console.log("New health check")
    if (healthy) {
        res.status(200)
        res.send("OK")
        console.log("Health check OK")
    } else {
        var connectionToDB = await startDB()
        console.log(`Connected to DB? ${connectionToDB}`)
        if (connectionToDB) { 
            res.status(200)
            res.send("OK")
            console.log("Health check OK")
            healthy = true
        }
        else {
            res.status(500)
            res.send("Error")
            console.log("Health check not OK")
            healthy = false
        }
    }
})

app.listen(port, function () {
    console.log("Server started in port: " + port);
})
