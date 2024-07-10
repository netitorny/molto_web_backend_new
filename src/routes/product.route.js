const express = require('express')
const router = express.Router()

const productService = require('./../services/product.service')

const formidable = require('formidable');
const path = require('path');

router.get('/', async (req, res) => {
    try {
        console.log("this is products/ route")
        res.json(await productService.find())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-one', async(req,res) => {
    try{
        console.log("get one product route by stop");
        res.json(await productService.getOne(req.query.id))
    }catch(err){ 
        console.log(err);
        res.json(err)
    }
})


router.delete('/delete', async (req, res) => {
    try {
        console.log('delete product route by stop');
        res.json(await productService.remove(req.query.id))

    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.get('/get_by_category', async (req, res) => {
    try {
        console.log('category id: ',req.query.category_id);
        res.json(await productService.getByCategory(req.query.category_id))
    } catch (err) {
        console.log(e);
        res.json(err)
    }
})

router.get('/related_products/:id_catagories/:language', async (req, res) => {
    try {
        var id_catagories = req.params.id_catagories
        var language = req.params.language
        console.log("this is products/related_product/:id_catagories route")
        console.log("id_catagories :: ", id_catagories)
        console.log("language relate product :: ", language)
        res.json(await productService.findRelatedProducts(id_catagories, language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})
router.get('/selected_product/:id_product/:language', async (req, res) => {
    try {
        var id_product = req.params.id_product
        var language = req.params.language
        console.log("this is products/selected_product/:id_product route")
        console.log("id_product :: ", id_product)
        console.log("language :: ", language)
        res.json(await productService.findByProductId(id_product, language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/filters/:language', async (req, res) => {
    try {

        console.log("this is products/filters route")
        var id_catagories = JSON.parse(req.query.catagories)
        var language = req.params.language
        console.log("lang ::", language)
        console.log(id_catagories)
        res.json(await productService.filtersProducts(id_catagories, language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/filterswithsale/:language', async (req, res) => {
    try {

        console.log("this is products/filterswithsale route")
        var id_catagories = JSON.parse(req.query.catagories)
        var language = req.params.language
        console.log("lang ::", language)
        console.log(id_catagories)
        res.json(await productService.filtersProductsWithSale(id_catagories, language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/test_addimage', async (req, res) => {
    try {

        console.log("test path :")
        res.json(await productService.addImage())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-title-product/:lang', async (req, res) => {
    try {
        console.log("this is products/get-title-product route")
        var slug = JSON.parse(req.query.slug)
        var language = req.params.lang
        res.json(await productService.getTitleProduct(slug, language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.post('/add',async (req,res) => {
    try{
        console.log('body in route', req.body);
        let stepback = path.join(__dirname, '../') + 'public/tmp'
        const form = formidable({
            multiples: true,
            uploadDir: stepback,
            keepExtensions: true,
            filename: function (name, ext, part, form) {
                return part.originalFilename
            }
        })
        form.parse(req, async (err, fields, files) => {
            console.log("this is products/add route");
            console.log('files :: ', files);
            console.log('fields :: ', fields);
            let parseBody = JSON.parse(fields.form)
            res.json(await productService.add(parseBody, files))
        })

    }catch(err){
        console.log(err);
        res.json(err)
    }
})

router.post('/edit',async (req,res) => {
    try{
        console.log('body in route', req.body);
        let stepback = path.join(__dirname, '../') + 'public/tmp'
        const form = formidable({
            multiples: true,
            uploadDir: stepback,
            keepExtensions: true,
            filename: function (name, ext, part, form) {
                return part.originalFilename
            }
        })
        form.parse(req, async (err, fields, files) => {
            console.log("this is products/add route");
            console.log('files :: ', files);
            // console.log('fields :: ', fields);
            let parseBody = JSON.parse(fields.form)
            res.json(await productService.edit(parseBody, files))
        })

    }catch(err){
        console.log(err);
        res.json(err)
    }
})

module.exports = {
    router
}