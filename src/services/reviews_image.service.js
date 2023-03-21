const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { reviews_image} = db
db.sequelize.sync()

async function find(){

    try {
        console.log("this is reviews_image/ service")
        var results = await reviews_image.findAll()
        
        return results
    } catch (err) {
        console.log(err)
    }

}

async function findImage() {
    try {
        var result = await reviews_image.findAll({
            where: { main: true }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

module.exports ={
    find,
    findImage
}