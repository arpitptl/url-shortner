const express = require('express')
const path = require('path')
const urlRouter = require('./routers/url')
const redirectRouter = require('./routers/redirect')

const connection = require('./db/config')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use('/', redirectRouter)
app.use('/api/url', urlRouter)

app.listen(port, () => {
    console.log("Server is up and running on port " + port)
})