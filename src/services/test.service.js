const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { test} = db
db.sequelize.sync()

async function find(){

    try {
        console.log("this is test/ service")
        var results = await test.findAll()
        
        return results
    } catch (err) {
        console.log(err)
    }

}

async function findByOne(){

    try {
        console.log("this is test/findbyone service")
        var results = await test.findOne({
            where:{
                id:1
            }
        })
        
        return results
    } catch (err) {
        console.log(err)
    }

}

module.exports ={
    find,
    findByOne
}