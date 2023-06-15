const express = require('express')
const router = express.Router()

const questionsService = require('./../services/questions.service')
//todo fomid file
const formidable = require('formidable');
const path=require('path');
//todo fomid file

router.get('/get/:language', async (req,res) => {
    try {
        console.log("this is questions/ route")
        var language = req.params.language
        console.log("language ::",language)
        res.json(await questionsService.find(language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-title-knowledge/:lang', async (req,res) => {
    try {
        console.log("this is questions/get-title-knowledge route")
        var slug = JSON.parse(req.query.slug)
        var language = req.params.lang
        res.json(await questionsService.getTitleKnowledge(slug,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/find-knowledge-by-id/:id/:lang', async (req,res) => {
    try {
        console.log("this is questions/get-title-knowledge route")
        // var id = JSON.parse(req.query.slug)
        var id = req.params.id
        var language = req.params.lang
        res.json(await questionsService.findKnowledgeByID(id,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.post('/create-knowledge', async (req,res) => {
    let stepback = path.join(__dirname,'../') + 'public/Knowledge'
    const form = formidable({
        multiples: true,
        uploadDir: stepback,
        keepExtensions: true,
        filename: function (name, ext, part, form) {
            return part.originalFilename
        }
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log('err: ', err);
            res.status(500).json({ error: err })
            return;
        }
        try {
            console.log("this is questions/create-knowledge route")
            console.log('files :: ',files);
            console.log('fields :: ',fields);
            // console.log('aaa',files);
            // let file_name = {}
            // let cover_photo = files.cover_photo.newFilename
            // let cover_photo_en = files.cover_photo_en.newFilename
            // let cover_photo_cn = files.cover_photo_cn.newFilename
            // console.log(cover_photo);
            // console.log(cover_photo_en);
            // console.log(cover_photo_cn);
            res.json(await questionsService.createKnowledge(fields,files))
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    })
})

router.get('/dashboard-get-questions', async (req,res) => {
    try {
        console.log("this is questions/dashboard-get-questions route")
        res.json(await questionsService.dashboardGetQuestions())
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/dashboard-get-questions-by-id/:id', async (req,res) => {
    try {
        console.log("this is questions/dashboard-get-questions-by-id route")
        let id = req.params.id
        console.log('id ::',id);
        res.json(await questionsService.dashboardGetQuestionsByID(id))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.patch('/update-knowledge', async (req,res) => {
    console.log('test');
    let stepback = path.join(__dirname,'../') + 'public/Knowledge'
    const form = formidable({
        multiples: true,
        uploadDir: stepback,
        keepExtensions: true,
        filename: function (name, ext, part, form) {
            return part.originalFilename
        }
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log('err: ', err);
            res.status(500).json({ error: err })
            return;
        }
        try {
            console.log("this is questions/update-knowledge route")
            console.log('files :: ',files);
            console.log('fields :: ',fields);
            // let file_name = {}
            // let cover_photo = files.cover_photo.newFilename
            // let cover_photo_en = files.cover_photo_en.newFilename
            // let cover_photo_cn = files.cover_photo_cn.newFilename
            // console.log(cover_photo);
            // console.log(cover_photo_en);
            // console.log(cover_photo_cn);
            res.json(await questionsService.updateKnowledge(fields,files))
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    })
})

router.delete('/delete-knowledge/:id', async (req,res) => {
    try {
        console.log("this is questions/delete-knowledge route")
        var id = req.params.id
        res.json(await questionsService.deleteKnowledge(id))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


module.exports = {
    router
}