const express = require('express')

const urlRouter = require('./routers/url')
const redirectRouter = require('./routers/redirect')

const connection = require('./db/config')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/', redirectRouter)
app.use('/api/url', urlRouter)

app.listen(port, () => {
    console.log("Server is up and running on port " + port)
})