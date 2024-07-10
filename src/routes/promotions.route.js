const express = require('express')
const router = express.Router()

const questionsService = require('./../services/promotions.service')

const formidable = require('formidable');
const path = require('path');


router.get('/', async (req, res) => {
    try {
        console.log('get all promotions route by stop');
        res.json(await questionsService.all())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-one', async (req, res) => {
    try {
        console.log("get one promotions route by stop");
        res.json(await questionsService.getOne(req.query.id))
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.post('/edit', async (req, res) => {
    try {
        console.log("edit promotion route by stop");
        let stepback = path.join(__dirname, '../') + 'public/Promotions'
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
            res.json(await questionsService.edit(parseBody))
        })
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.delete('/delete', async (req, res) => {
    try {
        console.log('delete promotion route by stop');
        res.json(await questionsService.remove(req.query.id))

    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.get('/:language', async (req, res) => {
    try {
        console.log("this is promotions/:language route")
        var language = req.params.language
        console.log("language ::", language)
        res.json(await questionsService.find(language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


router.post('/add', async (req, res) => {
    try {
        console.log("this is promotions/add route");
        let stepback = path.join(__dirname, '../') + 'public/Promotions'
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
            res.json(await questionsService.add(parseBody, files))
        })

    } catch (err) {
        console.log(err);
        res.json(err)
    }
})



module.exports = {
    router
}