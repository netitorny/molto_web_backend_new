const express = require('express')
const router = express.Router()

const questionsService = require('./../services/promotions.service')

router.get('/:language', async (req,res) => {
    try {
        console.log("this is promotions/:language route")
        var language = req.params.language
        console.log("language ::",language)
        res.json(await questionsService.find(language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})



module.exports = {
    router
}