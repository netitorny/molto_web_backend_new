const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { questions } = db
db.sequelize.sync()

async function find(language){

    try {
        console.log("this is questions/ service")
        console.log("language :",language)
        var arr_attribute = [
            'id',
            'slug'
        ]

        if(language == 'en'){
            arr_attribute.push(
                ['question_en','question'],
                ['topic_en','topic'],
                ['lists_en','lists'],
                ['img_en','img'],
                ['title_en','title'],
                ['label_en','label']
            )
        }
        else if(language == 'cn'){
            arr_attribute.push(
                ['question_cn','question'],
                ['topic_cn','topic'],
                ['lists_cn','lists'],
                ['img_cn','img'],
                ['title_cn','title'],
                ['label_cn','label']
            )
        }
        else{
            arr_attribute.push(
                ['question','question'],
                ['topic','topic'],
                ['lists','lists'],
                ['img','img'],
                ['title','title'],
                ['label','label']
            )
        }
        console.log("arr_attribute => ",arr_attribute)
        var results = await questions.findAll(
            {
                attributes:arr_attribute
            }
        )
        
        return results
    } catch (err) {
        console.log(err)
    }

}

async function getTitleKnowledge(slug,language){
    try {
        console.log("this is question/get-title-knowledge service")
        console.log("lang ::",language,':::slug ::',slug)
        let attributes_arr = ['id','seo_descriptions']
        if(language == 'en'){
            attributes_arr.push(['title_en','title'])
        }
        else if(language == 'cn'){
            attributes_arr.push(['title_cn','title'])
        }
        else{
            attributes_arr.push(['title','title'])
        }

        let results = await questions.findOne({
            attributes:attributes_arr,
            where:{
                slug:slug
            }
        })

        return results
    } catch (error) {
        console.log(error.message);
    }
}

async function findKnowledgeByID(id,language){
    try {
        console.log("this is question/find-knowledge-by-id service")
        console.log("lang ::",language,':::id ::',id)
        let attributes_arr = ['id','slug','alt','seo_descriptions']
        if(language == 'en'){
            attributes_arr.push(['question_en','question'])
            attributes_arr.push(['topic_en','topic'])
            attributes_arr.push(['lists_en','lists'])
            attributes_arr.push(['img_en','img'])
            attributes_arr.push(['title_en','title'])
            attributes_arr.push(['label_en','label'])
        }
        else if(language == 'cn'){
            attributes_arr.push(['question_cn','question'])
            attributes_arr.push(['topic_cn','topic'])
            attributes_arr.push(['lists_cn','lists'])
            attributes_arr.push(['img_cn','img'])
            attributes_arr.push(['title_cn','title'])
            attributes_arr.push(['label_cn','label'])
        }
        else{
            attributes_arr.push(['question','question'])
            attributes_arr.push(['topic','topic'])
            attributes_arr.push(['lists','lists'])
            attributes_arr.push(['img','img'])
            attributes_arr.push(['title','title'])
            attributes_arr.push(['label','label'])
        }

        let results = await questions.findOne({
            attributes:attributes_arr,
            where:{
                id:id
            }
        })

        return results
    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    find,
    getTitleKnowledge,
    findKnowledgeByID
}