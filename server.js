const express = require('express');
const http = require('http')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3001

app.use(express.static("public"))


server.listen(port, () => {
    console.log("Server now listening @ ", port)
})