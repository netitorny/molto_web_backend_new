const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { questions } = db
require('dotenv').config()

db.sequelize.sync()

async function find(language){

    try {
        console.log("this is questions/ service")
        console.log("language :",language)
        var arr_attribute = [
            'id',
            'slug',
            'enable',
            'order'
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
                attributes:arr_attribute,
                where:{
                    enable:true
                },
                order:[['order','ASC']]
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
        console.log(results.dataValues);
        return results
    } catch (error) {
        console.log(error.message);
    }
}

async function createKnowledge(data,files){
    try {
        console.log("this is question/create-knowledge service")
        let public_url = process.env.PUBLIC_URL
        let knowledge_details = JSON.parse(data.data)
        let cover_photo_files = files
        let cover_photo_checked = knowledge_details.cover_photo_checked
        let file_name = {}
        if(cover_photo_checked){
            console.log('aaaa');
            file_name.th = cover_photo_files.cover_photo.newFilename
            file_name.en = cover_photo_files.cover_photo.newFilename
            file_name.cn = cover_photo_files.cover_photo.newFilename
        }
        else{
            console.log('bbbb');
            file_name.th = cover_photo_files.cover_photo.newFilename
            file_name.en = cover_photo_files.cover_photo_en.newFilename
            file_name.cn = cover_photo_files.cover_photo_cn.newFilename
        }
        console.log('1',knowledge_details.content);
        let results = await db.questions.create({
            title:knowledge_details.title.th,
            title_en:knowledge_details.title.en,
            title_cn:knowledge_details.title.cn,
            label:knowledge_details.label.th,
            label_en:knowledge_details.label.en,
            label_cn:knowledge_details.label.cn,
            question:knowledge_details.question.th,
            question_en:knowledge_details.question.en,
            question_cn:knowledge_details.question.cn,
            lists:knowledge_details.content,
            lists_en:knowledge_details.content,
            lists_cn:knowledge_details.content,
            img:file_name.th,
            img_en:file_name.en,
            img_cn:file_name.cn,
            slug:knowledge_details.slug,
            alt:knowledge_details.alt,
            seo_descriptions:knowledge_details.seo_descriptions,
            enable:knowledge_details.enable,
        })
        // console.log('2',result.dataValues.lists);
        // if(cover_photo_checked)
        // console.log(cover_photo_files);
        return {
            results:results,
            status:'success'
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function dashboardGetQuestions(){
    try {
        console.log("this is questions/dashboard-get-questions service")
        var results = await questions.findAll({})
        
        return results
    } catch (err) {
        console.log(err)
    }
}
async function dashboardGetQuestionsByID(id){
    try {
        console.log("this is questions/dashboard-get-questions-by-id service")
        var results = await questions.findOne({
            where:{
                id:id
            }
        })
        
        return results
    } catch (err) {
        console.log(err)
    }
}

async function updateKnowledge(data,files){
    try {
        console.log("this is question/update-knowledge")
        let public_url = process.env.PUBLIC_URL
        let knowledge_details = JSON.parse(data.data)
        let cover_photo_files = files
        let cover_photo_checked = knowledge_details.cover_photo_checked
        let id = data.id
        let update_object = {
            title:knowledge_details.title.th,
            title_en:knowledge_details.title.en,
            title_cn:knowledge_details.title.cn,
            label:knowledge_details.label.th,
            label_en:knowledge_details.label.en,
            label_cn:knowledge_details.label.cn,
            question:knowledge_details.question.th,
            question_en:knowledge_details.question.en,
            question_cn:knowledge_details.question.cn,
            lists:knowledge_details.content,
            lists_en:knowledge_details.content,
            lists_cn:knowledge_details.content,
            slug:knowledge_details.slug,
            alt:knowledge_details.alt,
            seo_descriptions:knowledge_details.seo_descriptions,
            enable:knowledge_details.enable,
        }
        //check empty file
        if(Object.keys(cover_photo_files).length > 0){
            console.log('in else',Object.keys(cover_photo_files));
            let array_file_keys = Object.keys(cover_photo_files)
            array_file_keys.forEach(element => {
                // if(element == )
                update_object[element] = cover_photo_files[element].newFilename
            });
        }
        console.log('update_object :: ',update_object);
        let result = await db.questions.update(
            update_object,
            {
                where: { 
                    id: id
                }
            }
        )
        // console.log('2',result.dataValues.lists);

        // if(cover_photo_checked)
        // console.log(cover_photo_files);
        return {
            status:'success',
            result:result
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteKnowledge(id){
    try {
        console.log("this is question/delete-knowledge service")
        let results = await questions.destroy({
            where: {
                id: id
            }
        })
        return {
            results:results,
            status:'success'
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    find,
    getTitleKnowledge,
    findKnowledgeByID,
    createKnowledge,
    dashboardGetQuestions,
    dashboardGetQuestionsByID,
    updateKnowledge,
    deleteKnowledge
}