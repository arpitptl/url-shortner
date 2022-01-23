const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const router = express.Router()

const Url = require('../models/url')

// The API base Url endpoint
const baseUrl = 'http://localhost:3000'

router.post('/shorten', async (req, res) => {

    const {
        longUrl
    } = req.body

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid base URL")
    }

    const urlCode = shortid.generate()

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

module.exports = router