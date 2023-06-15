const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const path=require('path');

const fileService = require('../services/file.service')
require('dotenv').config()

// router.post('/', async (req,res) => {
//     try {
//         console.log("this is file/ route")
//         console.log('sss',req.body);
//         // const form = new formidable.IncomingForm()
//         const form = formidable({multiples:true})
//         // form.multiples = true
//         // console.log('form ',form)
//         // const form = formidable({})
//         var files
//         var fields
//         form.parse(req, function(err, fields, files){
//             console.log("Field :: ",fields)
//             console.log("File ::",files)
//             // console.log(typeof(files))
// //! ทำถึงนี่ อ่านไฟล์ได้แต่ยังไม่อัพลงโฟลเดอร์ทางหลังบ้าน
            
//         })

//         // var file = req.files
//         // var form = req.body.form
//         // console.log('file :: ',file)
//         // console.log('form :: ',form)

// //         res.json(await fileService.upload(files,fields))
//             // res.json(await fileService.upload())

//     } catch (err) {
//         console.log(err)
//         res.json(err)
//     }
// })

router.post("/editorUpload", async function (req, res, next) {
    let stepback = path.join(__dirname,'../') + 'public/uploads/media'
    let public_url = process.env.PUBLIC_URL
    console.log('adfads',public_url);
    const form = formidable({
        multiples: true,
        uploadDir: stepback,
        keepExtensions: true,
        filename: function (name, ext, part, form) {
          return part.originalFilename
        }
    });
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log('err: ', err);
            res.status(500).json({ error: err })
            return;
        }

        let image_url = public_url+'uploads/media/'+files.medias.newFilename
        console.log('url :: ',image_url);
        res.status(200).json({ url: image_url });
    })


    // form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //       console.log('err: ', err);
    //       res.status(500).json({ error: err })
    //       return;
    //     }
    //     console.log('asdfa',files);
    //     // var filePath = files.medias.filepath;
    //     // var fileDate = moment().format('DD.HH.mm.ss');
    //     // var folderDate = moment().format('YYYY-MM');
    //     // var destFileName = `editor/media/${folderDate}/${fileDate}-${files.medias.originalFilename}`;
    //     // console.log('destFileName: ', destFileName);
    //     // const options = {
    //     //   destination: destFileName,
    //     // };
  
    //     // var result = await bucket.upload(filePath, options);
    //     // if (result) {
    //     //   const public_url = format(`https://storage.googleapis.com/${bucket.name}/${destFileName}`)
    //     //   // result = await media.uploadOne(files.media, public_url)
    //     //   try {
    //     //     await bucket.file(destFileName).makePublic();
    //     //   } catch (e) {
    //     //     res.status(500).json(e)
    //     //   }
    //     //   res.status(200).json({ url: public_url })
    //     // }
    //   });

      //todo777
      // try {
      // console.log(req.file); // form files  
  
      // const form = formidable({
      //   multiples: true,
      //   uploadDir: `${__dirname}/public/uploads/media`,
      //   keepExtensions: true,
      //   filename: function (name, ext, part, form) {
      //     return part.originalFilename
      //   }
      // });
      // form.parse(req, async (err, fields, files) => {
  
      //   if (err) {
      //     console.log('err: ', err);
      //     res.status(500).json({ error: err })
      //     return;
      //   }
  
      //   var result = await media.editorUpload(files.medias);
      //   res.status(200).json({ progress: 100, url: result });
  
      // });
    }
  );

router.post("/upload-knowledge-cover", async function (req, res, next) {
    let stepback = path.join(__dirname,'../') + 'public/uploads/media'
    let public_url = process.env.PUBLIC_URL
    
    const form = formidable({
        multiples: true,
        uploadDir: stepback,
        keepExtensions: true,
        filename: function (name, ext, part, form) {
          return part.originalFilename
        }
    });
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log('err: ', err);
            res.status(500).json({ error: err })
            return;
        }

        let image_url = public_url+'uploads/media/'+files.medias.newFilename
        console.log('url :: ',image_url);
        res.status(200).json({ url: image_url });
    })
  }
)

module.exports = {
    router
}