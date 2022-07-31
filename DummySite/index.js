const k8s = require('@kubernetes/client-node')
const express = require('express')
const axios = require('axios')

let app = express()
let port = process.env.PORT || 8080

const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const watch = new k8s.Watch(kc)

let dummydata = "Hello World!"

async function geturl(url) {
    console.log("Getting website data")
    const request = await axios.get(url)
    dummydata = request.data
}

watch.watch('/apis/stable.dwk/v1/dummysites',
    // optional query parameters can go here.
    {
        allowWatchBookmarks: true,
    },
    // callback is called for each received object.
    (type, apiObj, watchObj) => {
        if (type === 'ADDED') {
            const url = apiObj.spec.website_url
            console.log(url)
            
            if (!url) {
                console.log("No url")
                return
            }

            geturl(url)
        } else if (type === 'MODIFIED') {
            console.log('changed object:')
        } else if (type === 'DELETED') {
            console.log('deleted object:')
        } else if (type === 'BOOKMARK') {
            console.log(`bookmark: ${watchObj.metadata.resourceVersion}`)
        } else {
            console.log('unknown type: ' + type)
        }
        console.log(apiObj)
    },
    (err) => {
        console.log("Error in watch")
        console.log(err)
    })
.then((req) => {
    // watch returns a request object which you can use to abort the watch.
    console.log("Setting timeout for abort")
    setTimeout(() => { req.abort() }, 100 * 1000);
})

app.get('/', (req, res) => {
    console.log("Sending dummy site")
    return res.send(dummydata)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
