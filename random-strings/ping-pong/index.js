const express = require('express')
const axios = require('axios')

const app = express()
var port = process.env.PINGPONGPORT || 8085

const password = process.env.POSTGRES_PASSWORD.toString()
const { Client } = require('pg');
const client = new Client({
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
    try {
        await client.connect()
        console.log("Connected to database")
    } catch(error) {
        console.log(error.stack)
        console.log("Couldn't connect to database. Exiting...")
        process.exit()
    }
    
    if (!queryDB(createTableQuery)) {
        console.log("Couldn't create table to database. Exiting...")
        process.exit()
    }
    console.log("Table was created")

    if(!queryDB(initialValue)) {
        console.log("Didn't insert initial values.")
    }
    console.log("Initial values added")
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

app.get('/pong', function(req, res) {
    console.log("Pongd")
    updateDB()
    
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

startDB()

app.listen(port, function () {
    console.log("Server started in port: " + port);
})
