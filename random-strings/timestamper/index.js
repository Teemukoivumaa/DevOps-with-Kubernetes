const path = require('path')
const fs = require('fs')

const dir = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(dir, 'log.txt')

var timestampText = "";

const timestamper = () => {
    let date = new Date()
    
    let timestamp = date.toISOString().slice(0, -5)
    timestamp = timestamp.replace('T', ' ')
    
    timestampText = `\n${timestamp}`
    console.log(timestamp)
    
    writeToFile()
    setTimeout(timestamper, 5000)
}

const writeToFile = () => {
    var fs = require('fs');

    fs.appendFile(filePath, timestampText, function (err) {
        if (err) throw err;
    });
}

const checkIfFileExists = () => {
    console.log('Checking if file exists & creating it if it does not exist')
    fs.appendFile(filePath, '', function (err, file) {
        if (err) throw err;
    });
}

checkIfFileExists()

timestamper()
