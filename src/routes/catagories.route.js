const express = require('express')
const router = express.Router()

const catagoriesService = require('../services/catagories.service')

router.get('/', async (req,res) => {
    try {
        console.log("this is catagories/ route")
        res.json(await catagoriesService.find())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/filters', async (req,res) => {
    try {
        console.log("this is catagories/filter route")
        var catagories = JSON.parse(req.query.catagories)
        console.log(catagories)
        res.json(await catagoriesService.findByCategoryID(catagories))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/home_catagories', async (req,res) => {
    try {
        console.log("this is catagories/home_catagories route")
        res.json(await catagoriesService.homeCatagories())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-title-catagory/:lang', async (req,res) => {
    try {
        console.log("this is catagories/get-title-catagory route")
        var slug = JSON.parse(req.query.slug)
        var language = req.params.lang
        console.log(slug)
        res.json(await catagoriesService.getTitleCatagory(slug,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = {
    router
}