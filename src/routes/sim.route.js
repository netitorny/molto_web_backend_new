const express = require('express')
const router = express.Router()
const multer = require("multer");
const fs = require("fs/promises");
const fs_sync = require("fs");
const path = require("path");
const simService = require('../services/sim.service')
const _jwt = require('../services/jwt.service')


const LIMIT_MB_FILE_SIZE = 5;  // 5MB limit per file


// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: LIMIT_MB_FILE_SIZE * 1024 * 1024 },
});

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "ยืนยันตัวตนล้มเหลว กรุณาเข้าสู่ระบบใหม่" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         // Check if the error is due to token expiration
    //         if (err.name === "TokenExpiredError") {
    //             return res.status(401).json({ message: "Token หมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง" });
    //         } else {
    //             return res.status(401).json({ message: "Token ไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่อีกครั้ง" });
    //         }
    //     }
    // });
    let decoded = _jwt.decodeToken(token)
    if (decoded) {
        // Token is valid
        req.user = decoded;
        next();
    } else {
        return res.status(401).json({ message: "Token ไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่อีกครั้ง" });
    }
}



router.post('/login', async (req, res) => {
    try {
        console.log("this is test/ route")
        res.json(await simService.login(req.body))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.post('/register', async (req, res) => {
    try {
        console.log("this is test/ route")
        res.json(await simService.register(req.body))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.post('/saveData', verifyToken, async (req, res) => {
    try {
        console.log("this is test/ route")
        res.json(await simService.saveData(req.body, req.user))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


router.get('/loadData', verifyToken, async (req, res) => {
    try {
        console.log("this is test/ route")
        res.json(await simService.loadData(req.user))
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.post('/upload', verifyToken, upload.array("images", 5), async (req, res) => {
    try {
        // Access uploaded files via req.files
        const images = req.files.map((file) => {
            return {
                filename: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                data: Buffer.from(file.buffer),
            };
        });
        // Create a unique folder for each upload
        const folderName = req.user.email + new Date().toISOString().replace(/[:.]/g, "");

        // Create the folder
        if(!fs_sync.existsSync(path.join(__dirname, "../") + 'sim_uploads/')) {
            fs_sync.mkdirSync(path.join(__dirname, "../") + 'sim_uploads/');
        }

        const folderPath = path.join(__dirname, "../") + 'sim_uploads/' + folderName;

        await fs.mkdir(folderPath, { recursive: true });

        const productList = req.body.productList;
        console.log("RECEIVED FROM " + req.user.email);

        // Save the JSON message as a file
        const jsonFilePath = path.join(folderPath, "cart.json");
        await fs.writeFile(jsonFilePath, productList);
        console.log("Saved JSON to:", jsonFilePath);

        // Save each image as a file
        await Promise.all(
            images.map((image, index) => {
                const imagePath = path.join(folderPath, image.filename);
                return fs.writeFile(imagePath, image.data);
            })
        );

        res.status(200).json({
            message: "บันทึกข้อมูลสำเร็จ",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = {
    router
}