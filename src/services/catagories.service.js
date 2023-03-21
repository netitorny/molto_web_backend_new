const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { catagories, products } = db

db.sequelize.sync()

async function find(){

    try {
        console.log("this is catagories/ service")
        var results = await catagories.findAll({
            where:{
                id_catagories:{
                    [db.op.not] : 27
                },
                order:{
                    [db.op.not] : null
                }
            },
            order:[
                [ db.Sequelize.col('order'), 'ASC']
            ]
        })
        
        return results
    } catch (err) {
        console.log(err)
    }

}

async function findByCategoryID(id_catagories){
    try {
        console.log("this is catagories/filters service")
        console.log("catagories :",id_catagories)
        var results = await catagories.findAll({
            where:{
                id_catagories:{
                    [db.op.or] : id_catagories
                }
            },
            order:[
                [ db.Sequelize.col('name_catagories'), 'ASC']
                // [products,'id_products','DESC']
            ]
        })
        // console.log('results :: ',results)
        return results
        
    } catch (err) {
        console.log(err)
    }
}

async function homeCatagories(){
    try {
        console.log("this is catagories/home_catagories")
        var results = await catagories.findAll({
            where:{
                main : {
                    [db.op.not] : 0
                }
            },
            order:[
                [ db.Sequelize.col('main'), 'ASC']
                // [products,'id_products','DESC']
            ]
        })
        // console.log('results :: ',results)
        return results
        
    } catch (err) {
        console.log(err)
    }
}

async function getTitleCatagory(slug){
    try {
        console.log("this is catagories/get-title-catagory route")
        let results = await catagories.findOne({
            attributes:['id_catagories','name_catagories'],
            where:{
                slug_catagory:slug
            }
        })

        return results
    } catch (error) {
        
    }
}

module.exports ={
    find,
    findByCategoryID,
    homeCatagories,
    getTitleCatagory
}