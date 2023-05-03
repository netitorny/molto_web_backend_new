const express = require('express')
const router = express.Router()
const formidable = require('formidable');

const fileService = require('../services/file.service')

router.post('/', async (req,res) => {
    try {
        console.log("this is file/ route")
        console.log('sss',req.body);
        // const form = new formidable.IncomingForm()
        const form = formidable({multiples:true})
        // form.multiples = true
        // console.log('form ',form)
        // const form = formidable({})
        var files
        var fields
        form.parse(req, function(err, fields, files){
            console.log("Field :: ",fields)
            console.log("File ::",files)
            // console.log(typeof(files))
//! ทำถึงนี่ อ่านไฟล์ได้แต่ยังไม่อัพลงโฟลเดอร์ทางหลังบ้าน
            
        })

        // var file = req.files
        // var form = req.body.form
        // console.log('file :: ',file)
        // console.log('form :: ',form)

//         res.json(await fileService.upload(files,fields))
            // res.json(await fileService.upload())

    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = {
    router
}