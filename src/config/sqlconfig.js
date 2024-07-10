require('dotenv').config()
// console.log('process env :', process.env)


const { Sequelize,Op } = require('sequelize');
console.log('process env :', process.env.DB_HOST)

//อันนี้เป็นส่วนที่ใช้ในการบอก Sequelize ว่าเราจะ connect ไปที่ไหน
const sequelize = new Sequelize(
  // 'molto.db', // นี่เป็นชื่อ DB ของเรานะครับ
  // 'root', // user ที่ใช้สรการเข้าไปยัง db
  // 'password', // password 
  process.env.DB_NAME, // นี่เป็นชื่อ DB ของเรานะครับ
  process.env.DB_USERNAME, // user ที่ใช้สรการเข้าไปยัง db
  process.env.DB_PASSWORD, // password 
  {
  host: process.env.DB_HOST, // host ของ db ที่เราสร้างเอาไว้
  dialect: 'mysql', // 'mysql' | 'mariadb' | 'postgres' | 'mssql'   พวกนี้ใช่ก็ใช้ได้นะจ๊ะ
  define: {
    timestamps: false //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
  },
  logging: false
});

  const db = {};
  db.op = Op

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

//ส่วนนี้เป็นการ import model ของ table ใน database เข้ามาเพื่อตั้งต่า relation นะครับ
  db.test = require("./../models/test")( sequelize , Sequelize );
  db.questions = require("./../../src/models/questions.model")(sequelize , Sequelize)
  db.catagories = require('./../models/catagories.model')(sequelize , Sequelize)
  db.products = require('./../models/product.model')(sequelize , Sequelize)
  db.users = require('../models/user.model')(sequelize, Sequelize)
  db.image = require('./../models/image.model')(sequelize, Sequelize)
  db.file = require('./../models/image.model')(sequelize, Sequelize)
  db.videos = require('../models/videos')(sequelize, Sequelize)
  db.reviews = require('../models/reviews.model')(sequelize, Sequelize)
  db.reviews_image =  require('../models/reviews_image.model')(sequelize, Sequelize)
  db.promotions = require('../models/promotions.model')(sequelize, Sequelize)
  db.sim_user = require('../models/sim_user.model')(sequelize, Sequelize)


//relations
  db.catagories.hasMany(db.products,{foreignKey:'id_catagories'})
  db.products.belongsTo(db.catagories,{foreignKey:'id_catagories',targetkey:'id_catagories'})
  
  db.products.hasMany(db.image,{foreignKey:'id_products'})
  db.image.belongsTo(db.products,{foreignKey:'id_products',targetkey:'id_products'})

  db.reviews.hasMany(db.reviews_image,{foreignKey:'reviews_id'})
  db.reviews_image.belongsTo(db.reviews,{foreignKey:'reviews_id',targetkey:'reviews_id'})
//ส่วนนี้เป็นการตั้งต่า relation นะครับ โดยเป็นการบอกว่าใน 1 team มีได้หลาย player ง่ายๆ ก็คือ relation แบบ 1:M 
  // db.catagories.hasMany(
  //   db.products,
  //   {
  //       foreignKey: { name: 'tid', field: 'tid' }, //name ตรงสำคัญพยายามตั่งให้เป็นชื่อเดียวกับ FK ใน table ที่นำไปใช้นะครับ
  //   }
  // );
//ส่วนนี้เป็นการตั้ง relation แบบกลับกันกับด้านบน จริงแล้วเราไม่ตั้งก็ได้นะครับแต่ผมแนะนำให้ตั้งเอาไว้ เพราะเวลาที่เราไม่ได้ใส่ 
//line นี้จะทำให้เราสามารถใช้  team ในการหา player ได้อย่างเดียวและไม่สามารถใช้ player หา team ได้
//   db.player.belongsTo(db.team, { foreignKey: 'tid' });

  module.exports = db;
