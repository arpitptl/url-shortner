const express = require('express')

const router = express.Router()
const Url = require('../models/url')


router.get('/:code', async (req, res) => {
    const _code = req.params.code

    try {
        const url = await Url.findOne({
            urlCode: _code
        })

        if (url) {
            return res.redirect(url.longUrl)
        }

        return res.status(404).json('No URL found')

    } catch (e) {
        console.log(e)
        return res.status(500).send()
    }
})


module.exports = router