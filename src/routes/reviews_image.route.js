const express = require('express')
const router = express.Router()

const _image_imageService = require('../services/reviews_image.service')

router.get('/', async (req,res) => {
    try {
        console.log("this is reviews_image/ route")
        res.json(await _image_imageService.find())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/image', async (req,res) => {
    try {
        res.json(await _image_imageService.findImage())
    } catch (err) {
        console.log(err)
    }
})

module.exports = {
    router
}