const express = require('express')
const router = express.Router()

const catagoriesService = require('../services/catagories.service')

const formidable = require('formidable');
const path = require('path');

router.get('/', async (req, res) => {
    try {
        console.log("this is catagories/ route")
        res.json(await catagoriesService.find())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/all',async (req,res) => {
    try {
        console.log("this is catagories/all route")
        res.json(await catagoriesService.all())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-one', async(req,res) => {
    try{
        console.log("get one category route by stop");
        res.json(await catagoriesService.getOne(req.query.id))
    }catch(err){ 
        console.log(err);
        res.json(err)
    }
})

router.post('/edit', async (req, res) => {
    try {
        console.log("edit catagories route by stop");
        let stepback = path.join(__dirname, '../') + 'public/Catagories Banner'
        const form = formidable({
            multiples: true,
            uploadDir: stepback,
            keepExtensions: true,
            filename: function (name, ext, part, form) {
                return part.originalFilename
            }
        })
        form.parse(req, async (err, fields, files) => {
            console.log('files :: ', files);
            console.log('fields :: ', fields);
            let parseBody = JSON.parse(fields.form)
            res.json(await catagoriesService.edit(parseBody))
        })
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.delete('/delete', async (req, res) => {
    try {
        console.log('delete category route by stop');
        res.json(await catagoriesService.remove(req.query.id))

    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.get('/filters', async (req, res) => {
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

router.get('/home_catagories/:lang', async (req, res) => {
    try {
        let language = req.params.lang
        console.log("this is catagories/home_catagories route")
        res.json(await catagoriesService.homeCatagories(language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-title-catagory/:lang', async (req, res) => {
    try {
        console.log("this is catagories/get-title-catagory route")
        var slug = JSON.parse(req.query.slug)
        var language = req.params.lang
        console.log(slug)
        res.json(await catagoriesService.getTitleCatagory(slug, language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.post('/add', async (req, res) => {
    try {
        let stepback = path.join(__dirname, '../') + 'public/Catagories Banner'
        const form = formidable({
            multiples: true,
            uploadDir: stepback,
            keepExtensions: true,
            filename: function (name, ext, part, form) {
                return part.originalFilename
            }
        })
        form.parse(req, async (err, fields, files) => {
            console.log("this is category/add route");
            console.log('files :: ', files);
            console.log('fields :: ', fields);
            let parseBody = JSON.parse(fields.form)
            res.json(await catagoriesService.add(parseBody, files))
        })

    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

module.exports = {
    router
}