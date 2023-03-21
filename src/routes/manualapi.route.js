const express = require('express')
const router = express.Router()

const manualapiService = require('../services/manualapi.service')

router.get('/slug-catagories-api', async (req,res) => {
    try {
        console.log("this is slug-catagories-api/ route")
        res.json(await manualapiService.slugCategoriesAPI())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})
router.get('/slug-products-api', async (req,res) => {
    try {
        console.log("this is slug-products-api/ route")
        res.json(await manualapiService.slugProductsAPI())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = {
    router
}