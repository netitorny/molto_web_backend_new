const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { file } = db

db.sequelize.sync()

// async function upload(image,form){
async function upload(){
    console.log('this is file/ service')




    try {
        
    } catch (err) {
        console.log(err)
    }

}


module.exports ={
    upload,
}