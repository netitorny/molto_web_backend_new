const db = require('./../config/sqlconfig')
const { QueryTypes, Op } = require('sequelize')
const { products, image, catagories } = db
// const { Op } = require("sequelize");
db.sequelize.sync()

const fs = require('fs-extra')

const manualapiService = require('../services/manualapi.service')


async function find() {

    try {
        console.log("this is products/ service")
        var promotion_results = await products.findAll({
            where: {
                discount_price: { [db.op.ne]: 0 },
                enable: { [db.op.ne]: 0 },
            },
            include: [
                {
                    model: image,
                    where: {
                        main: true
                    },
                    separate: true,
                    require: false
                }
            ]
        })

        var results = await products.findAll({
            include: [
                {
                    model: image,
                    separate: true,
                    require: false
                }
            ]
        })


        console.log("complete")

        return {
            promotion_results: promotion_results,
            results: results
        }
    } catch (err) {
        console.log(err)
    }
}

async function getOne(id) {
    console.log('get one product service by stop');
    var one = await products.findOne({
        where: {
            id_products: id
        },
        include: [
            {
                model: image,
                separate: true,
                require: false
            }
        ],
    })

    return { status: 'success', data: one }
}

async function remove(id) {
    try {
        console.log('id: ', id);
        const removed = await products.destroy({ where: { id_products: id } })
        console.log('removed: ', removed);

        return { status: 'success', data: removed }

    } catch (err) {
        console.log(err.message);
        return { status: 'error' }
    }
}

async function getByCategory(category_id) {
    try {
        console.log('get by category service');
        var result = await products.findAll({
            where: {
                id_catagories: category_id
            },
            order: [['order', 'DESC']],
            include: [
                {
                    model: image,
                    separate: true,
                    require: false
                }
            ],
        })
        return { status: 'success', data: result }
    } catch (err) {
        console.log(err);
        return { status: 'error' }
    }
}

async function findRelatedProducts(id_catagories, language) {
    try {
        console.log("this is products/related_product/:id_catagories service")
        console.log("language :", language)
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
        if (language == 'en') {
            arr_attribute.push(['name_product_en', 'name_product'])
        }
        else if (language == 'cn') {
            arr_attribute.push(['name_product_cn', 'name_product'])
        }
        else {
            arr_attribute.push(['name_product', 'name_product'])
        }
        // console.log('table :: ',product_lang)
        var results = await products.findAll({
            where: {
                id_catagories: id_catagories,
                enable: { [db.op.ne]: 0 }
            },
            attributes: arr_attribute,
            include: [
                {
                    model: image,
                    where: {
                        main: true
                    },
                    separate: true,
                    require: false
                }
            ]
        })
        // console.log(results)

        return results
    } catch (err) {
        console.log(err)
    }
}

async function filtersProducts(id_catagories, language) {
    try {
        console.log("this is products/filters/:id_catagories route service")
        console.log("catagories :", id_catagories)
        console.log("language :", language)
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
            'alt'
        ]
        var product_lang
        if (language == 'en') {
            arr_attribute.push(['name_product_en', 'name_product'])
            arr_attribute_image.push(['shelves_color_en', 'shelves_color'])
        }
        else if (language == 'cn') {
            arr_attribute.push(['name_product_cn', 'name_product'])
            arr_attribute_image.push(['shelves_color_cn', 'shelves_color'])
        }
        else {
            arr_attribute.push(['name_product', 'name_product'])
            arr_attribute_image.push(['shelves_color', 'shelves_color'])
        }
        // console.log('table :: ',product_lang)
        var results = await products.findAll({
            where: {
                id_catagories: {
                    [db.op.or]: id_catagories
                },
                enable: { [db.op.ne]: 0 }
            },
            attributes: arr_attribute,
            include: [
                {
                    model: image,
                    attributes: arr_attribute_image,
                    where: {
                        main: true
                    },
                    separate: true,
                    require: false
                }
            ],
            order: [
                ['order', 'ASC']
            ]
        })
        console.log('results :: ',results)
        return results

    } catch (err) {
        console.log(err)
    }
}

async function filtersProductsWithSale(id_catagories, language) {
    try {
        console.log("this is products/filterswithsale route service")
        console.log("catagories :", id_catagories)
        console.log("language :", language)
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
            'alt'
        ]

        if (language == 'en') {
            arr_attribute.push(['name_product_en', 'name_product'])
            arr_attribute_image.push(['shelves_color_en', 'shelves_color'])
        }
        else if (language == 'cn') {
            arr_attribute.push(['name_product_cn', 'name_product'])
            arr_attribute_image.push(['shelves_color_cn', 'shelves_color'])
        }
        else {
            arr_attribute.push(['name_product', 'name_product'])
            arr_attribute_image.push(['shelves_color', 'shelves_color'])
        }

        var results = await products.findAll({
            // where:{
            //     id_catagories:{
            //         [db.op.or] : id_catagories
            //     },
            //     discount_price : { [db.op.ne] : 0 }

            // },
            where: {
                id_catagories: 27,
                enable: { [db.op.ne]: 0 }

            },
            attributes: arr_attribute,
            include: [
                {
                    model: image,
                    attributes: arr_attribute_image,
                    where: {
                        main: true
                    },
                    separate: true,
                    require: false
                }
            ],
            order: [
                ['order', 'ASC']
            ]
        })
        // console.log('results :: ',results)
        return results

    } catch (err) {
        console.log(err)
    }
}

async function findByProductId(id_product, language) {
    try {
        console.log("this is products/selected_product/:id_product service")
        console.log("language :", language)
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
            'out_of_stock',
            'alt'
        ]

        if (language == 'en') {
            arr_attribute.push(
                ['name_product_en', 'name_product'],
                ['type_color_en', 'type_color'],
                ['material_en', 'material'],
                ['properties_en', 'properties']
            )
            arr_attribute_image.push(['shelves_color_en', 'shelves_color'])
        }
        else if (language == 'cn') {
            arr_attribute.push(
                ['name_product_cn', 'name_product'],
                ['type_color_cn', 'type_color'],
                ['material_cn', 'material'],
                ['properties_cn', 'properties']
            )
            arr_attribute_image.push(['shelves_color_cn', 'shelves_color'])
        }
        else {
            arr_attribute.push(
                ['name_product', 'name_product'],
                ['type_color', 'type_color'],
                ['material', 'material'],
                ['properties', 'properties']
            )
            arr_attribute_image.push(['shelves_color', 'shelves_color'])
        }
        console.log("arr_attribute => ", arr_attribute)
        var results = await products.findAll({
            where: {
                id_products: id_product,
                enable: { [db.op.ne]: 0 }
            },
            attributes: arr_attribute,
            include: [
                {
                    model: image,
                    attributes: arr_attribute_image,
                    separate: true,
                    require: false
                },
                {
                    model: catagories,
                    attributes: ['slug_catagory']
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
            where: {
                id_catagories: {
                    [db.op.or]: [21]
                },
                enable: { [db.op.ne]: 0 }
            },
            attributes: ['id_products', 'name_catagories']
        })

        for (let i = 0; i < results.length; i++) {
            var info_image = await image.create({
                id_products: results[i].id_products,
                shelves_color: null,
                img_path: '028.png',
                main_color: null,
                folder: 'Share',
                main: false
            })
        }
        return results
    } catch (err) {
        console.log(err)
    }
}

async function getTitleProduct(slug, language) {
    try {
        console.log("this is product/get-title-product route")
        console.log("lang ::", language, ':::slug ::', slug)
        let attributes_arr = ['id_products', 'name_product']
        if (language == 'en') {
            attributes_arr.push(['name_product_en', 'name_product'])
        }
        else if (language == 'cn') {
            attributes_arr.push(['name_product_cn', 'name_product'])
        }
        else {
            attributes_arr.push(['name_product', 'name_product'])
        }

        let results = await products.findOne({
            attributes: attributes_arr,
            where: {
                slug_product: slug
            }
        })

        return results
    } catch (error) {

    }
}

async function add(body) {
    try {
        console.log('this is products/:add service');
        for (const image of body.images) {
            delete image.show_image
        }
        console.log('body:', body);

        let images = body.images
        delete body.images

        body.type_color = [body.type_color]
        body.type_color_en = [body.type_color_en]
        body.type_color_cn = [body.type_color_cn]
        body.material = [body.material]
        body.material_en = [body.material_en]
        body.material_cn = [body.material_cn]
        body.properties = body.properties.split('\n')
        body.properties_en = body.properties_en.split('\n')
        body.properties_cn = body.properties_cn.split('\n')

        // body.out_of_stock = null
        body.order = await catagories.count({ where: { id_catagories: body.id_catagories } })
        body.slug_product = manualapiService.slugify(body.name_product_en)
        const product = await products.create(body)

        images.map(x => {
            x.id_products = product.id_products,
                x.folder = product.name_catagories,
                x.main = 1
        })

        console.log('images: ', images);

        const res = await image.bulkCreate(images)

        console.log('res: ', res);

        for (const image of images) {
            let src_path = `src/public/tmp/${image.img_path}`
            let des_path = `src/public/Production Pic/${image.folder}/${image.img_path}`
            await fs.move(src_path, des_path)
        }

        return { status: 'success', data: product }

    } catch (err) {
        console.log(err.message);
        return { status: 'error' }
    }
}

async function edit(body) {
    try {
        image_id_arr = []
        let original_body = body
        console.log('this is products/:edit service');
        for (const image of body.images) {
            delete image.show_image
        }
        // console.log('body:', body);

        let images = body.images
        delete body.images

        let id = body.id_products
        delete body.id_products

        body.type_color = Array.isArray(body.type_color) ? body.type_color : [body.type_color]
        body.type_color_en = Array.isArray(body.type_color_en) ? body.type_color_en : [body.type_color_en]
        body.type_color_cn = Array.isArray(body.type_color_cn) ? body.type_color_cn : [body.type_color_cn]
        body.material = Array.isArray(body.material) ? body.material : [body.material]
        body.material_en = Array.isArray(body.material_en) ? body.material_en : [body.material_en]
        body.material_cn = Array.isArray(body.material_cn) ? body.material_cn : [body.material_cn]
        body.properties = Array.isArray(body.properties) ? body.properties : body.properties.split('\n')
        body.properties_en = Array.isArray(body.properties_en) ? body.properties_en : body.properties_en.split('\n')
        body.properties_cn = Array.isArray(body.properties_cn) ? body.properties_cn : body.properties_cn.split('\n')


        const product = await products.update(body, { where: { id_products: id } })


        for (const x of images) {
            
            if (!x.id_pictures) {
                delete x.id_pictures
                x.folder = body.name_catagories
                x.main = 1
                x.id_products = id
                let new_image = await image.create(x)
                image_id_arr.push(new_image.id_pictures)
            } else {
                let id_pic = x.id_pictures
                delete x.id_pictures
                await image.update(x, { where: { id_pictures: id_pic } })
                console.log('id_pic: ', id_pic);
                image_id_arr.push(id_pic)
            }
        }

        console.log('image_id_arr: ', image_id_arr);

        let deleteImage = await image.destroy({ where: { id_pictures: { [Op.not]: image_id_arr }, id_products: id } })

        console.log('deleteImage: ', deleteImage);

        // images.map(async x => {
        //     x.id_products = id
        //     x.folder = body.name_catagories
        //     x.main = 0
        //     await image.update(body, { where: { id_pictures: x.id_pictures } })
        // })

        for (const image of images) {
            let src_path = `src/public/tmp/${image.img_path}`
            if (fs.existsSync(src_path)) {
                let des_path = `src/public/Production Pic/${image.folder}/${image.img_path}`
                if (!fs.existsSync(des_path)) {
                    await fs.move(src_path, des_path)
                }
            }
        }

        return { status: 'success', data: original_body }

    } catch (err) {
        console.log(err.message);
        return { status: 'error' }
    }
}


module.exports = {
    find,
    getByCategory,
    findRelatedProducts,
    filtersProducts,
    filtersProductsWithSale,
    findByProductId,
    addImage,
    getTitleProduct,
    add,
    edit,
    getOne,
    remove
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


// console.log(complete)