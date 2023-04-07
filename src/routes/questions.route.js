const express = require('express')
const router = express.Router()

const questionsService = require('./../services/questions.service')

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


module.exports = {
    router
}