const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { catagories, products } = db

db.sequelize.sync()

async function slugCategoriesAPI(){

    try {
        console.log("this is slug-catagories-api/ service")
        var results = await catagories.findAll({
            attributes:['name_catagories','id_catagories','slug_catagory'],
            order:[
                [ db.Sequelize.col('id_catagories'), 'ASC']
                // [products,'id_products','DESC']
            ],
        })
        let temp_slug = []

        results.forEach(category => {
            let slug = category.name_catagories.replaceAll(' + ','-').replaceAll(' ','-')
            temp_slug.push(
                {
                    id_catagories : category.id_catagories,
                    slug : slug.toLowerCase(),
                }
            )
        });

        for(i=0;i<results.length;i++){
            await catagories.update(
                {
                    slug_catagory : temp_slug[i].slug.toLowerCase()
                },
                {
                    where:{
                        id_catagories : temp_slug[i].id_catagories
                    }
                }
            )
        }

        // var results_products = await products.findAll({
        //     attributes:['id_catagories','slug_categories'],
        //     order:[
        //         [ db.Sequelize.col('id_catagories'), 'ASC']
        //     ],
        // })

        // for(i=0;i<temp_slug.length;i++){
        //     for(j=0;j<results_products.length;j++){
        //         if(temp_slug[i].id_catagories == results_products[j].id_catagories){
        //             await products.update(
        //             {
        //                 slug_categories : temp_slug[i].slug
        //             },
        //             {
        //                 where:{
        //                     id_catagories : temp_slug[i].id_catagories
        //                 }
        //             }
        //             )
        //         }
        //     }
        // }
        
        return results
    } catch (err) {
        console.log(err)
    }

}

async function slugProductsAPI(){

    try {
        console.log("this is slug-products-api/ service")

        var results_products = await products.findAll({
            attributes:['id_products','slug_product','name_product_en'],
            order:[
                [ db.Sequelize.col('id_catagories'), 'ASC']
            ],
        })
        temp_slug = []
        results_products.forEach(element => {
            let slug = element.name_product_en.replaceAll(' + ','-').replaceAll('(','-').replaceAll(')','').replaceAll('/','-').replaceAll('. ','').replaceAll('.-','').replaceAll(' ','-')
            temp_slug.push(
                {
                    id_products:element.id_products,
                    slug_product:slug
                }
            )
        })

        for(i = 0;i<results_products.length;i++){
            await products.update(
                {
                    slug_product:temp_slug[i].slug_product.toLowerCase()
                },
                {
                    where:{
                        id_products : temp_slug[i].id_products
                    }
                }
            )
        }

        
        return temp_slug
    } catch (err) {
        console.log(err)
    }

}

module.exports ={
    slugCategoriesAPI,
    slugProductsAPI
}