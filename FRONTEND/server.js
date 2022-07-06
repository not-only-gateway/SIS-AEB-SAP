const express = require('express')
const next = require('next')
const DEV = process.env.NODE_ENV !== 'production'

const app = next({ dev : DEV })
const handle = app.getRequestHandler()
const {PORT, HOST} = require("./SERVER_CONFIG.json")
app.prepare()
    .then(() => {
        const server = express()

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(PORT, HOST,(err) => {
            if (err) throw err
            console.log('> Ready')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
