const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const {test, products, image, catagories } = db
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

async function updateAltImageTable(){
    try {
        console.log('service');
        let img_id = await image.findAll({
            attributes:['id_pictures'],
            raw:true
        })
        
        for(let i = 0;i<img_id.length;i++){
            let test_alt = 'test '+i
            console.log(test_alt);
            await image.update(
                {
                    alt:test_alt
                },
                {
                    where:{
                        id_pictures:img_id[i].id_pictures
                    }
                }
            )
            console.log(img_id[i].id_pictures,'::',test_alt)
        }
        console.log('succeed');
        return 'succeed'

    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    find,
    findByOne,
    updateAltImageTable
}