const db = require('./../config/sqlconfig')
const { QueryTypes } = require('sequelize')
const { catagories, products } = db

db.sequelize.sync()

const manualapiService = require('../services/manualapi.service')

async function all() {
    console.log('all categories service by stop');
    var all = await catagories.findAll({
        order: [
            ['id_catagories', 'DESC']
        ]
    })

    return { status: 'success', data: all }
}

async function getOne(id) {
    console.log('get one category service by stop');
    var one = await catagories.findByPk(id)

    return { status: 'success', data: one }
}

async function find() {

    try {
        console.log("this is catagories/ service")
        var results = await catagories.findAll({
            where: {
                id_catagories: {
                    [db.op.not]: 27
                },
                order: {
                    [db.op.not]: null
                }
            },
            order: [
                [db.Sequelize.col('order'), 'ASC']
            ]
        })

        return results
    } catch (err) {
        console.log(err)
    }

}

async function remove(id) {
    try {
        console.log('id: ', id);
        const removed = await catagories.destroy({ where: { id_catagories: id } })
        console.log('removed: ', removed);

        return { status: 'success', data: removed }

    } catch (err) {
        console.log(err.message);
        return { status: 'error' }
    }
}

async function findByCategoryID(id_catagories) {
    try {
        console.log("this is catagories/filters service")
        console.log("catagories :", id_catagories)
        var results = await catagories.findAll({
            where: {
                id_catagories: {
                    [db.op.or]: id_catagories
                }
            },
            order: [
                [db.Sequelize.col('name_catagories'), 'ASC']
                // [products,'id_products','DESC']
            ]
        })
        // console.log('results :: ',results)
        return results

    } catch (err) {
        console.log(err)
    }
}

async function homeCatagories(language) {
    try {
        console.log("this is catagories/home_catagories")
        console.log('language homecat : ', language);
        let attributes_arr = ['id_catagories', 'name_catagories', 'image_catagories', 'slug_catagory']
        if (language == 'en') {
            attributes_arr.push(['name_descriptions_en', 'name_descriptions'])
        }
        else if (language == 'cn') {
            attributes_arr.push(['name_descriptions_cn', 'name_descriptions'])
        }
        else {
            attributes_arr.push(['name_descriptions', 'name_descriptions'])
        }
        var results = await catagories.findAll({
            where: {
                main: {
                    [db.op.not]: 0
                }
            },
            order: [
                [db.Sequelize.col('main'), 'ASC']
                // [products,'id_products','DESC']
            ],
            attributes: attributes_arr
        })
        // console.log('results :: ',results)
        return results

    } catch (err) {
        console.log(err)
    }
}

async function getTitleCatagory(slug, language) {
    try {
        console.log("this is catagories/get-title-catagory route")
        console.log(slug);
        let attributes_arr = ['id_catagories', 'name_catagories', 'seo_descriptions']
        if (language == 'en') {
            attributes_arr.push(['title_en', 'title'])
        }
        else if (language == 'cn') {
            attributes_arr.push(['title_cn', 'title'])
        }
        else {
            attributes_arr.push(['title', 'title'])
        }
        let results = await catagories.findOne({
            attributes: attributes_arr,
            where: {
                slug_catagory: slug
            }
        })

        return results
    } catch (error) {

    }
}

async function add(body, files) {
    try {
        console.log("this is categories/:add service");
        body.main = 0
        body.order = await catagories.count() + 1
        body.slug_catagory = manualapiService.slugify(body.name_catagories)

        const category = await catagories.create(body)

        return { status: 'success', data: category }

    } catch (err) {
        console.log(err.message);
        return { status: 'error' }
    }
}

async function edit(body) {
    try {
        let original_body = body
        console.log("this is catagories/edit");
        let id = body.id_catagories
        delete body.id_catagories
        body.main = 0
        body.order = await catagories.count() + 1
        body.slug_catagory = manualapiService.slugify(body.name_catagories)

        const catagory = await catagories.update(body, { where: { id_catagories: id } })

        console.log('catagory: ', catagory);

        return { status: 'success', data: original_body }
    } catch (err) {
        console.log(err.message);
        return { status: 'error' }
    }
}

module.exports = {
    find,
    findByCategoryID,
    homeCatagories,
    getTitleCatagory,
    all,
    add,
    edit,
    getOne,
    remove
}