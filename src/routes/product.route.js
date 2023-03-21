const express = require('express')
const router = express.Router()

const productService = require('./../services/product.service')

router.get('/', async (req,res) => {
    try {
        console.log("this is products/ route")
        res.json(await productService.find())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})
router.get('/related_products/:id_catagories/:language', async (req,res) => {
    try {
        var id_catagories = req.params.id_catagories
        var language = req.params.language
        console.log("this is products/related_product/:id_catagories route")
        console.log("id_catagories :: ",id_catagories)
        console.log("language relate product :: ",language)
        res.json(await productService.findRelatedProducts(id_catagories,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})
router.get('/selected_product/:id_product/:language', async (req,res) => {
    try {
        var id_product = req.params.id_product
        var language = req.params.language
        console.log("this is products/selected_product/:id_product route")
        console.log("id_product :: ",id_product)
        console.log("language :: ",language)
        res.json(await productService.findByProductId(id_product,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/filters/:language', async (req,res) => {
    try {
        
        console.log("this is products/filters route")
        var id_catagories = JSON.parse(req.query.catagories)
        var language = req.params.language
        console.log("lang ::",language)
        console.log(id_catagories)
        res.json(await productService.filtersProducts(id_catagories,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})
router.get('/filterswithsale/:language', async (req,res) => {
    try {
        
        console.log("this is products/filterswithsale route")
        var id_catagories = JSON.parse(req.query.catagories)
        var language = req.params.language
        console.log("lang ::",language)
        console.log(id_catagories)
        res.json(await productService.filtersProductsWithSale(id_catagories,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/test_addimage', async (req,res) => {
    try {
        
        console.log("test path :")
        res.json(await productService.addImage())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-title-product/:lang', async (req,res) => {
    try {
        console.log("this is products/get-title-product route")
        var slug = JSON.parse(req.query.slug)
        var language = req.params.lang
        res.json(await productService.getTitleProduct(slug,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


module.exports = {
    router
}