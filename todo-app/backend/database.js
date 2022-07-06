const password = process.env.POSTGRES_PASSWORD.toString()

const { Client } = require('pg')
const client = new Client({
    host: 'postgres-svc',
    user: 'postgres',
    database: 'postgres',
    password: password,
    port: 5432
})
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "todos" (
        id SERIAL PRIMARY KEY,
        todo VARCHAR NOT NULL
    );`

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
}

module.exports = {
    startDB,
    queryDB,
    client
}
