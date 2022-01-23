const express = require('express')
const connection = require('./db/config')

const Url = require('./models/url')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))


app.post('/urls', async (req, res) => {
    console.log(req.body)
    const url = new Url(req.body)
    try {
        await url.save()
        res.status(200).send(url)

    } catch (e) {
        res.send(e)

    }
})

app.listen(port, () => {
    console.log("Server is up and running on port" + port)
})