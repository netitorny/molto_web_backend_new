const db = require("./../config/sqlconfig");
const { QueryTypes, Op } = require("sequelize");
const { promotions } = db;
db.sequelize.sync();

const date = new Date();
let month_th = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
let month_en = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
let month_cn=[
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
]

async function find(language) {
  try {
    console.log("this is promotions/:language service");
    console.log("language :", language);
    var arr_attribute = ["id", "month"];

    if (language == "en") {
      arr_attribute.push(
        ["promotions_en", "promotions"],
        ["image_en", "image"]
      );
    } else if (language == "cn") {
      arr_attribute.push(
        ["promotions_cn", "promotions"],
        ["image_cn", "image"]
      );
    } else {
      arr_attribute.push(["promotions", "promotions"], ["image", "image"]);
    }
    console.log("arr_attribute => ", arr_attribute);
    month = date.getMonth() + 1;
    var main_promotions = await promotions.findAll({
      where: {
        month: month,
      },
      attributes: arr_attribute,
      order: [[db.Sequelize.col("month"), "ASC"]],
    });
    var sub_promotions = await promotions.findAll({
      where: {
        month: {
          [Op.not]: month,
        },
      },
      attributes: arr_attribute,
      order: [[db.Sequelize.col("month"), "ASC"]],
    });
    var all_promotions = await promotions.findAll({
      attributes: arr_attribute,
      order: [[db.Sequelize.col("month"), "ASC"]],
    });
    let unique_sub_month
    let unique_all_month
    if (language == "cn"){
        var main_month;
      console.log("main_promotions :: ", main_promotions[0].month);
      for (let i = 0; i < month_cn.length; i++) {
        if (i + 1 == main_promotions[0].month) {
          main_month = month_cn[i];
        }
      }

      var sub_month = [];
      for (var sub of sub_promotions) {
        var test = month_cn.find((m, index) => {
          if (index + 1 == sub.month) return sub.month;
        });
        sub_month.push(test);
      }
      var all_month = [];
      for (var sub of all_promotions) {
        var test = month_cn.find((m, index) => {
          if (index + 1 == sub.month) return sub.month;
        });
        all_month.push(test);
      }
      unique_sub_month = [...new Set(sub_month)]
      unique_all_month = [...new Set(all_month)]
    }

    else if (language == "en") {
        var main_month;
        console.log("main_promotions :: ", main_promotions[0].month);
        for (let i = 0; i < month_en.length; i++) {
          if (i + 1 == main_promotions[0].month) {
            main_month = month_en[i];
          }
        }
  
        var sub_month = [];
        for (var sub of sub_promotions) {
          var test = month_en.find((m, index) => {
            if (index + 1 == sub.month) return sub.month;
          });
          sub_month.push(test);
        }
        var all_month = [];
        for (var sub of all_promotions) {
          var test = month_en.find((m, index) => {
            if (index + 1 == sub.month) return sub.month;
          });
          all_month.push(test);
        }
        unique_sub_month = [...new Set(sub_month)]
        unique_all_month = [...new Set(all_month)]
    }
    
    else {
      var main_month;
      console.log("main_promotions :: ", main_promotions[0].month);
      for (let i = 0; i < month_th.length; i++) {
        if (i + 1 == main_promotions[0].month) {
          main_month = month_th[i];
        }
      }

      var sub_month = [];
      for (var sub of sub_promotions) {
        var test = month_th.find((m, index) => {
          if (index + 1 == sub.month) return sub.month;
        });
        sub_month.push(test);
      }
      var all_month = [];
      for (var sub of all_promotions) {
        var test = month_th.find((m, index) => {
          if (index + 1 == sub.month) return sub.month;
        });
        all_month.push(test);
      }
      unique_sub_month = [...new Set(sub_month)]
      unique_all_month = [...new Set(all_month)]
    }

    // console.log("sub_month: ", sub_month);
    // console.log("all_month: ", all_month);
    console.log("main_month :: ", main_month);
    console.log("unique_sub_month :: ", unique_sub_month);
    console.log("unique_all_month :: ", unique_all_month);

    var result_all_promotions = all_promotions.reduce((x, y) => {

        (x[y.month] = x[y.month] || []).push(y);

        return x;

    }, {});
    var result_sub_promotions = sub_promotions.reduce((x, y) => {

        (x[y.month] = x[y.month] || []).push(y);

        return x;

    }, {});

    return {
      main_promotions: { main_promotions, main_month },
      sub_promotions: { result_sub_promotions, unique_sub_month },
      all_promotions: { result_all_promotions, unique_all_month },
    };

    //   var result = all_promotions.reduce((x, y) => {

    //       (x[y.month] = x[y.month] || []).push(y);

    //       return x;

    //   }, {});

    //   console.log(result);
    
    //     return {
    //   main_promotions: main_promotions,
    //   sub_promotions: sub_promotions,
    //   all_promotions: all_promotions,
    //   results:result
    // };
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = {
  find,
};
