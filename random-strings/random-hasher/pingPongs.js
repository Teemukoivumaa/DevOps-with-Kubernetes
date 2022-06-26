const express = require('express')
const router = express.Router();

var pingPongs = 0

router.post('/', (req, res) => {
    var newPings = req.body.pingPongs
    console.log(`New amount of ping-pongs: ${newPings}`)
    
    pingPongs = newPings ? newPings : pingPongs
    res.send('OK')
});

const returnPingPongs = () => { return pingPongs }

module.exports = {
    router,
    returnPingPongs
};
