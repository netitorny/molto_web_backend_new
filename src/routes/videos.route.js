const express = require('express')
const router = express.Router()

const videosService = require('../services/videos.service')

router.get('/:language', async (req,res) => {
    try {
        console.log("this is videos/ route")
        var language = req.params.language
        console.log("language ::",language)
        res.json(await videosService.find(language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = {
    router
}