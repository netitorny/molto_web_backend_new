const db = require('./../config/sqlconfig')
// const { QueryTypes } = require('sequelize')
const { sim_user } = db
db.sequelize.sync()

const _jwt = require('../services/jwt.service')
const bcrypt = require('bcrypt');
// Hash function for password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

async function login(user) {
    const { email, password } = user;
    console.log("Login attempt using email: " + email);

    const normalizedEmail = email.toLowerCase();
    // Check if user exists
    // db.get("SELECT * FROM users WHERE LOWER(email) = ?", [normalizedEmail], async (err, user) => {
    //     if (err) {
    //         return res.status(500).json({ message: "Internal Server Error" });
    //     }

    //     if (!user) {
    //         return res.status(401).json({ message: "อีเมล หรือ รหัสผ่านไม่ถูกต้อง" });
    //     }

    //     // Compare hashed password
    //     const passwordMatch = await bcrypt.compare(password, user.password);
    //     if (!passwordMatch) {
    //         return res.status(401).json({ message: "อีเมล หรือ รหัสผ่านไม่ถูกต้อง" });
    //     }

    //     // Generate JWT token
    //     const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: TOKEN_EXPIRE_TIME });
    //     res.json({ token: token });
    // });

    //---
    let _user = await sim_user.findOne({
        where: {
            email: normalizedEmail
        }
    })

    if (_user) {
        const passwordMatch = await bcrypt.compare(password, _user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "อีเมล หรือ รหัสผ่านไม่ถูกต้อง" });
        }

        // Generate JWT token
        const token = _jwt.signToken({ email: _user.email });
        return { token: token };
    } else {
        return { message: 'error' };
    }
}

async function register(user) {
    const { name, surname, email, phoneNum, password } = user;
    console.log("Register using email: " + email);

    if (!password || !email || !name || !surname) {
        return res.status(400).json({ message: "ข้อมูลไม่ถูกต้อง" });
    }

    const normalizedEmail = email.toLowerCase();
    // Check if user already exists
    // db.get("SELECT * FROM users WHERE LOWER(email) = ?", [normalizedEmail], async (err, existingUser) => {
    //     if (err) {
    //         return res.status(500).json({ message: "Internal Server Error" });
    //     }

    //     if (existingUser) {
    //         return res.status(400).json({ message: "มีข้อมูลผู้ใช้นี้อยู่แล้ว" });
    //     }

    //     // Hash the password
    //     const hashedPassword = await hashPassword(password);

    //     // Insert new user
    //     db.run("INSERT INTO users (name, surname, email, phoneNum, password) VALUES (?, ?, ?, ?, ?)",
    //         [name, surname, email, phoneNum, hashedPassword],
    //         (err) => {
    //             if (err) {
    //                 return res.status(500).json({ message: "Internal Server Error" });
    //             }

    //             // Generate JWT token
    //             const token = jwt.sign({ email: email }, secretKey, { expiresIn: "24h" });
    //             res.json({ token: token });
    //         });
    // });

    //-------------------
    let _user = await sim_user.findOne({
        where: {
            email: normalizedEmail
        }
    })

    if (_user) {
        return { message: 'มีข้อมูลผู้ใช้นี้อยู่แล้ว' };

    } else {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Insert new user
        const create = await sim_user.create({ name: name, surname: surname, email: email, phoneNum: phoneNum, password: hashedPassword })

        if (create) {
            const token = _jwt.signToken({ email: _user.email });
            return { token: token };
        } else {
            return { message: 'error' };
        }
    }


}

async function saveData(body, user) {
    const jsonData = body;

    let email = user.email
    const normalizedEmail = email.toLowerCase();
    // Update user"s savedData in the database
    // db.run("UPDATE users SET savedData = ? WHERE LOWER(email) = ?", [JSON.stringify(jsonData), normalizedEmail], (err) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).json({ message: "Internal Server Error" });
    //     }

    //     console.log("GET LOAD REQUEST FROM " + req.user.email);
    //     res.json({ message: "ข้อมูลได้รับการบันทึกเรียบร้อบ" });
    // });

    //----------

    let update = await sim_user.update({
        saveData: JSON.stringify(jsonData)
    }, {
        where: {
            email: normalizedEmail
        }
    })

    if (update) {
        console.log("GET SAVE REQUEST FROM " + user.email);
        return { message: "ข้อมูลได้รับการบันทึกเรียบร้อบ" };
    } else {
        return { message: 'error' };
    }
}

async function loadData(user) {
    let email = user.email
    const normalizedEmail = email.toLowerCase();
    // Retrieve user"s savedData from the database
    // db.get("SELECT savedData FROM users WHERE LOWER(email) = ?", [normalizedEmail], (err, user) => {
    //     if (err) {
    //         res.json({});
    //         return;
    //     }

    //     if (!user) {
    //         return res.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    //     }

    //     const savedData = user.savedData ? JSON.parse(user.savedData) : {};

    //     console.log("GET LOADE REQUEST FROM " + req.user.email);
    //     console.log("Data loaded");
    //     res.json(savedData);
    // });

    //----------
    let data = await sim_user.findOne({
        attributes: ['saveData'],
        where: {
            email: normalizedEmail
        }
    })

    const savedData = data.savedData ? JSON.parse(data.savedData) : {};
    console.log("GET LOAD REQUEST FROM " + req.user.email);
    console.log("Data loaded");
    return savedData
}


module.exports = {
    login,
    register,
    saveData,
    loadData
}