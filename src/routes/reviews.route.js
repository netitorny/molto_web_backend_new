const express = require('express')
const router = express.Router()

const reviewsService = require('../services/reviews.service')

router.get('/:language', async (req,res) => {
    try {
        var language = req.params.language
        console.log("this is reviews/ route")
        console.log("lang :",language)
        res.json(await reviewsService.find(language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/findByReviewsID/:reviews_id/:language', async (req,res) => {
    try {
        console.log("this is reviews/findByReviewsID/:reviews_id route")
        var reviews_id = req.params.reviews_id
        var language = req.params.language
        console.log("reviews id : ",reviews_id)
        console.log("language :: ",language)
        res.json(await reviewsService.findByReviewsID(reviews_id,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/get-title-reviews/:lang', async (req,res) => {
    try {
        console.log("this is reviews/get-title-reviews route")
        var slug = JSON.parse(req.query.slug)
        var language = req.params.lang
        res.json(await reviewsService.getTitleReviews(slug,language))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = {
    router
}