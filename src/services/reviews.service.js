const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { reviews_image } = require('./../config/sqlconfig')
const { reviews} = db
db.sequelize.sync()

async function find(language){

    try {
        console.log("this is reviews/ service")
        console.log("lang :: ",language)
        var arr_attribute = [
            'reviews_id',
            'slug_reviews'
        ]
        if(language == 'en'){
            arr_attribute.push(
                ['reviews_topics_en','reviews_topics'],
            )
        }
        else if(language == 'cn'){
            arr_attribute.push(
                ['reviews_topics_cn','reviews_topics'],
            )
        }
        else{
            arr_attribute.push(
                ['reviews_topics','reviews_topics'],
            )
        }
        var results = await reviews.findAll({
            include : [
                {
                    model : reviews_image,
                    separate : true,
                    require : false
                }
            ],
            attributes : arr_attribute,
        })
        
        return results
    } catch (err) {
        console.log(err)
    }

}

async function findByReviewsID(reviews_id,language){

    try {
        console.log("this is reviews/:reviews_id service")
        console.log("language :",language)
        var arr_attribute = [
            'reviews_id',
        ]
        if(language == 'en'){
            arr_attribute.push(
                ['reviews_topics_en','reviews_topics'],
            )
        }
        else if(language == 'cn'){
            arr_attribute.push(
                ['reviews_topics_cn','reviews_topics'],
            )
        }
        else{
            arr_attribute.push(
                ['reviews_topics','reviews_topics'],
            )
        }
        var results = await reviews.findAll({
            where:{
                    reviews_id:reviews_id
            },
            include : [
                {
                    model : reviews_image,
                    separate : true,
                    require : false
                }
            ],
            attributes : arr_attribute,
        })
        
        return results
    } catch (err) {
        console.log(err)
    }

}

async function getTitleReviews(slug,language){
    try {
        console.log("this is reviews/get-title-reviews route")
        console.log("lang ::",language,':::slug ::',slug)
        let attributes_arr = ['reviews_id','reviews_topics']
        if(language == 'en'){
            attributes_arr.push(['reviews_topics_en','reviews_topics'])
        }
        else if(language == 'cn'){
            attributes_arr.push(['reviews_topics_cn','reviews_topics'])
        }
        else{
            attributes_arr.push(['reviews_topics','reviews_topics'])
        }

        let results = await reviews.findOne({
            attributes:attributes_arr,
            where:{
                slug_reviews:slug
            }
        })

        return results
    } catch (error) {
        
    }
}

module.exports ={
    find,
    findByReviewsID,
    getTitleReviews
}