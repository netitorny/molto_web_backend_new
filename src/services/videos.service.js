const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { videos} = db
db.sequelize.sync()

async function find(language){

    try {
        console.log("this is videos/ service")
        console.log("this is questions/ service")
        console.log("language :",language)
        var arr_attribute = [
            'id',
            'video_path',
            'img_path',
            'alt'
        ]
        if(language == 'en'){
            arr_attribute.push(
                ['name_en','name']
            )
        }
        else if(language == 'cn'){
            arr_attribute.push(
                ['name_cn','name']
            )
        }
        else{
            arr_attribute.push(
                ['name','name']
            )
        }
        console.log("arr_attribute => ",arr_attribute)
        var results = await videos.findAll(
            {
                attributes:arr_attribute,
                order:[
                    ['order','ASC']
                ]
            },
        )
        
        return results
    } catch (err) {
        console.log(err)
    }

}

module.exports ={
    find
}