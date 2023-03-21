const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { questions } = db
db.sequelize.sync()

async function find(language){

    try {
        console.log("this is questions/ service")
        console.log("language :",language)
        var arr_attribute = [
            'id'
        ]

        if(language == 'en'){
            arr_attribute.push(
                ['question_en','question'],
                ['topic_en','topic'],
                ['lists_en','lists'],
                ['img_en','img']
            )
        }
        else if(language == 'cn'){
            arr_attribute.push(
                ['question_cn','question'],
                ['topic_cn','topic'],
                ['lists_cn','lists'],
                ['img_cn','img']
            )
        }
        else{
            arr_attribute.push(
                ['question','question'],
                ['topic','topic'],
                ['lists','lists'],
                ['img','img']
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

module.exports ={
    find,
}