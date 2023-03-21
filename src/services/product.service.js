const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { products, image, catagories } = db
// const { Op } = require("sequelize");
db.sequelize.sync()

async function find(){

    try {
        console.log("this is products/ service")
        var promotion_results = await products.findAll({
            where : {
                discount_price : { [db.op.ne] : 0 },
                enable : { [db.op.ne] : 0 },
            },
            include : [
                {
                    model : image,
                    where :{
                        main : true
                    },
                    separate : true,
                    require : false
                }
            ]
        })

        var results = await products.findAll({
            include : [
                {
                    model : image,
                    separate : true,
                    require : false
                }
            ]
        })
        

        console.log("complete")
        
        return {
            promotion_results : promotion_results,
            results : results
        }
    } catch (err) {
        console.log(err)
    }
}

async function findRelatedProducts(id_catagories,language){
    try {
        console.log("this is products/related_product/:id_catagories service")
        console.log("language :",language)
        var arr_attribute = [
            'id_products',
            'id_catagories',
            'name_catagories',
            'w',
            'd',
            'h',
            'price',
            'product_type',
            'discount_price',
            'type_color',
            'material',
            'properties',
            'slug_product'
        ]
        var product_lang
        if(language == 'en'){
            arr_attribute.push(['name_product_en','name_product'])
        }
        else if(language == 'cn'){
            arr_attribute.push(['name_product_cn','name_product'])
        }
        else{
            arr_attribute.push(['name_product','name_product'])
        }
        // console.log('table :: ',product_lang)
        var results = await products.findAll({
            where :{
                id_catagories : id_catagories,
                enable : { [db.op.ne] : 0 }
            },
            attributes:arr_attribute,
            include : [
                {
                    model : image,
                    where : {
                        main : true
                    },
                    separate : true,
                    require : false
                }
            ]
        })
        // console.log(results)

        return results
    } catch (err) {
        console.log(err)
    }
}

async function filtersProducts(id_catagories,language){
    try {
        console.log("this is products/filters/:id_catagories route service")
        console.log("catagories :",id_catagories)
        console.log("language :",language)
        var arr_attribute = [
            'id_products',
            'id_catagories',
            'name_catagories',
            'w',
            'd',
            'h',
            'price',
            'product_type',
            'discount_price',
            'type_color',
            'material',
            'properties',
            'out_of_stock',
            'slug_product',
            'order'
        ]
        var arr_attribute_image = [
            'id_pictures',
            'id_products',
            'img_path',
            'main_color',
            'folder',
            'main',
        ]
        var product_lang
        if(language == 'en'){
            arr_attribute.push(['name_product_en','name_product'])
            arr_attribute_image.push(['shelves_color_en','shelves_color'])
        }
        else if(language == 'cn'){
            arr_attribute.push(['name_product_cn','name_product'])
            arr_attribute_image.push(['shelves_color_cn','shelves_color'])
        }
        else{
            arr_attribute.push(['name_product','name_product'])
            arr_attribute_image.push(['shelves_color','shelves_color'])
        }
        // console.log('table :: ',product_lang)
        var results = await products.findAll({
            where:{
                id_catagories:{
                    [db.op.or] : id_catagories
                },
                enable : { [db.op.ne] : 0 }
            },
            attributes:arr_attribute,
            include : [
                {
                    model : image,
                    attributes:arr_attribute_image,
                    where : {
                        main : true
                    },
                    separate : true,
                    require : false
                }
            ],
            order:[
                ['order','ASC']
            ]
        })
        // console.log('results :: ',results)
        return results
        
    } catch (err) {
        console.log(err)
    }
}

async function filtersProductsWithSale(id_catagories,language){
    try {
        console.log("this is products/filterswithsale route service")
        console.log("catagories :",id_catagories)
        console.log("language :",language)
        var arr_attribute = [
            'id_products',
            'id_catagories',
            'name_catagories',
            'w',
            'd',
            'h',
            'price',
            'product_type',
            'discount_price',
            'type_color',
            'material',
            'properties',
            'out_of_stock',
            'slug_product',
            'order'
        ]
        var arr_attribute_image = [
            'id_pictures',
            'id_products',
            'img_path',
            'main_color',
            'folder',
            'main',
        ]

        if(language == 'en'){
            arr_attribute.push(['name_product_en','name_product'])
            arr_attribute_image.push(['shelves_color_en','shelves_color'])
        }
        else if(language == 'cn'){
            arr_attribute.push(['name_product_cn','name_product'])
            arr_attribute_image.push(['shelves_color_cn','shelves_color'])
        }
        else{
            arr_attribute.push(['name_product','name_product'])
            arr_attribute_image.push(['shelves_color','shelves_color'])
        }

        var results = await products.findAll({
            // where:{
            //     id_catagories:{
            //         [db.op.or] : id_catagories
            //     },
            //     discount_price : { [db.op.ne] : 0 }

            // },
            where:{
                id_catagories:27,
                enable : { [db.op.ne] : 0 }

            },
            attributes:arr_attribute,
            include : [
                {
                    model : image,
                    attributes:arr_attribute_image,
                    where : {
                        main : true
                    },
                    separate : true,
                    require : false
                }
            ],
            order:[
                ['order','ASC']
            ]
        })
        // console.log('results :: ',results)
        return results
        
    } catch (err) {
        console.log(err)
    }
}

async function findByProductId(id_product,language) {
    try {
        console.log("this is products/selected_product/:id_product service")
        console.log("language :",language)
        var arr_attribute = [
            'id_products',
            'id_catagories',
            'name_catagories',
            'w',
            'd',
            'h',
            'price',
            'product_type',
            'discount_price',
            'slug_product'
        ]

        var arr_attribute_image = [
            'id_pictures',
            'id_products',
            'img_path',
            'main_color',
            'folder',
            'main',
            'out_of_stock'
        ]

        if(language == 'en'){
            arr_attribute.push(
                ['name_product_en','name_product'],
                ['type_color_en','type_color'],
                ['material_en','material'],
                ['properties_en','properties']
            )
            arr_attribute_image.push(['shelves_color_en','shelves_color'])
        }
        else if(language == 'cn'){
            arr_attribute.push(
                ['name_product_cn','name_product'],
                ['type_color_cn','type_color'],
                ['material_cn','material'],
                ['properties_cn','properties']
            )
            arr_attribute_image.push(['shelves_color_cn','shelves_color'])
        }
        else{
            arr_attribute.push(
                ['name_product','name_product'],
                ['type_color','type_color'],
                ['material','material'],
                ['properties','properties']
            )
            arr_attribute_image.push(['shelves_color','shelves_color'])
        }
        console.log("arr_attribute => ",arr_attribute)
        var results = await products.findAll({
            where :{
                id_products : id_product,
                enable : { [db.op.ne] : 0 }
            },
            attributes:arr_attribute,
            include : [
                {
                    model : image,
                    attributes:arr_attribute_image,
                    separate : true,
                    require : false
                },
                {
                    model : catagories,
                    attributes:['slug_catagory']
                }
            ]
        })
        // console.log(results)

        return results
    } catch (err) {
        console.log(err)
    }
}

async function addImage() {
    try {
        var results = await products.findAll({
            where:{
                id_catagories:{
                    [db.op.or] : [21]
                },
                enable : { [db.op.ne] : 0 }
            },
            attributes:['id_products','name_catagories']
        })

        for(let i=0;i<results.length;i++) {
            var info_image = await image.create({
                id_products: results[i].id_products,
                shelves_color:null,
                img_path:'028.png',
                main_color:null,
                folder:'Share',
                main:false
            })
        }
        return results
    } catch (err) {
        console.log(err)
    }
}

async function getTitleProduct(slug,language){
    try {
        console.log("this is product/get-title-product route")
        console.log("lang ::",language,':::slug ::',slug)
        let attributes_arr = ['id_products','name_product']
        if(language == 'en'){
            attributes_arr.push(['name_product_en','name_product'])
        }
        else if(language == 'cn'){
            attributes_arr.push(['name_product_cn','name_product'])
        }
        else{
            attributes_arr.push(['name_product','name_product'])
        }

        let results = await products.findOne({
            attributes:attributes_arr,
            where:{
                slug_product:slug
            }
        })

        return results
    } catch (error) {
        
    }
}


module.exports ={
    find,
    findRelatedProducts,
    filtersProducts,
    filtersProductsWithSale,
    findByProductId,
    addImage,
    getTitleProduct
}


// var promotion_results = await products.findAll({
//     where : {
//         discount_price : { [db.op.ne] : 0 },
//     },
//     include : [
//         {
//             model : image,
//             where : {
//                 shelves_color : 'black'
//             },
//             require : false
//         }
//     ]
// })

// var results = await products.findAll({
//     include : [
//         {
//             model : image,
//             where : {
//                 shelves_color : 'black'
//             },
//             require : false
//         }
//     ]
// })










// var promotion_results = await catagories.findAll({
//     // where : {
//     //     discount_price : { [db.op.ne] : 0 },
//     // },
//     include : [
//         {
//             model : products,
//             separate : true
//             // require : false,
//         }
//     ],
//     // order:[
//     //     [ db.Sequelize.col('id_products'), 'ASC']
//     //     // [products,'id_products','DESC']
//     // ]
// })
// console.log(promotion_results);

// // var results = await products.findAll({
// //     include : [
// //         {
// //             model : image,
// //             require : false
// //         }
// //     ]
// // })


// console.log("complete")