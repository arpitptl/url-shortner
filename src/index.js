const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const connection = require('./db/config')

const Url = require('./models/url')
const {
    isValid
} = require('shortid')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// The API base Url endpoint
const baseUrl = 'http://localhost:3000'

app.post('/shorten', async (req, res) => {

    const {
        longUrl
    } = req.body

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid base URL")
    }

    const urlCode = shortid.generate()
    console.log("SHORT CODE: ", urlCode)

    if (validUrl.isUri(longUrl)) {
        try {

            let url = await Url.findOne({
                longUrl
            })

            if (url) {
                return res.json(url)
            }

            const shortUrl = baseUrl + '/' + urlCode

            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            })

            await url.save()
            return res.json(url)

        } catch (e) {
            console.log(e)
            return res.status(500).send()
        }
    } else {
        res.status(401).json('Invalid long url provided')
    }
})

app.listen(port, () => {
    console.log("Server is up and running on port" + port)
})