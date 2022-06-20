const express = require('express')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
let app = express()
let port = process.env.PORT || 8080

const dir = path.join('/', 'usr', 'src', 'app', 'files')
//const dir = path.join('./')

app.use(express.static(dir));

var pictureDate = ""
var picturePath = ""
var pictureName = ""

const imageExists = async () => new Promise(res => {
    fs.stat(picturePath, (err, stats) => {
        if (err || !stats) return res(false)
        return res(true)
    })
})

async function downloadPicture() {
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(picturePath))
    console.log("Todays picture downloaded")
}

const checkDate = () => {
    let date = new Date()
    let dateNow = date.toISOString().slice(0, -14)

    if (pictureDate != dateNow) {
        pictureDate = dateNow
        pictureName = `${pictureDate}.jpg`

        picturePath = path.join(dir, pictureName)
        console.log(`Picture path: ${picturePath}`)
    }
}

async function checkImage() {
    checkDate()
    console.log(`Checking if todays picture "${picturePath}" exists..`)
    
    if (await imageExists()) { console.log("Existed"); return }
    await downloadPicture()
}


app.get('/', async function(req, res) {
    console.log("Site pinged")
    await checkImage()

    res.send
        (
        ` 
        </br> </br>
        <h2>Todo-app</h2>
        <img src="${pictureName}" width="500" height="600">
        `
        )

    console.log("-------------\n\n")
})

app.listen(port, function () {
    console.log("Server started in port: " + port)
})

console.log("-------------\n\n")
