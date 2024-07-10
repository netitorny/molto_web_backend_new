const db = require("./../config/sqlconfig");
const { QueryTypes, Op } = require("sequelize");
const { promotions } = db;
db.sequelize.sync();

// const date = new Date();
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

//! :: old query
// async function find(language) {
//   try {
//     console.log("this is promotions/:language service");
//     console.log("language :", language);
//     var arr_attribute = ["id", "month","alt","date_order"];

//     if (language == "en") {
//       arr_attribute.push(
//         ["promotions_en", "promotions"],
//         ["image_en", "image"]
//       );
//     } else if (language == "cn") {
//       arr_attribute.push(
//         ["promotions_cn", "promotions"],
//         ["image_cn", "image"]
//       );
//     } else {
//       arr_attribute.push(["promotions", "promotions"], ["image", "image"]);
//     }
//     console.log("arr_attribute => ", arr_attribute);
//     month = date.getMonth() + 1;
//     var main_promotions = await promotions.findAll({
//       where: {
//         month: month,
//       },
//       attributes: arr_attribute,
//       order: [[db.Sequelize.col("month"), "ASC"]],
//     });
//     var sub_promotions = await promotions.findAll({
//       where: {
//         month: {
//           [Op.not]: month,
//         },
//       },
//       attributes: arr_attribute,
//       order: [[db.Sequelize.col("date_order"), "DESC"]],
//       raw:true
//     });
//     console.log('mmm',sub_promotions);
//     var all_promotions = await promotions.findAll({
//       attributes: arr_attribute,
//       order: [[db.Sequelize.col("month"), "DESC"]],
//     });
//     let unique_sub_month
//     let unique_all_month
//     if (language == "cn"){
//         var main_month;
//       console.log("main_promotions :: ", main_promotions[0].month);
//       for (let i = 0; i < month_cn.length; i++) {
//         if (i + 1 == main_promotions[0].month) {
//           main_month = month_cn[i];
//         }
//       }

//       var sub_month = [];
//       for (var sub of sub_promotions) {
//         var test = month_cn.find((m, index) => {
//           if (index + 1 == sub.month) return sub.month;
//         });
//         sub_month.push(test);
//       }
//       var all_month = [];
//       for (var sub of all_promotions) {
//         var test = month_cn.find((m, index) => {
//           if (index + 1 == sub.month) return sub.month;
//         });
//         all_month.push(test);
//       }
//       unique_sub_month = [...new Set(sub_month)]
//       unique_all_month = [...new Set(all_month)]
//     }

//     else if (language == "en") {
//         var main_month;
//         console.log("main_promotions :: ", main_promotions[0].month);
//         for (let i = 0; i < month_en.length; i++) {
//           if (i + 1 == main_promotions[0].month) {
//             main_month = month_en[i];
//           }
//         }
  
//         var sub_month = [];
//         for (var sub of sub_promotions) {
//           var test = month_en.find((m, index) => {
//             if (index + 1 == sub.month) return sub.month;
//           });
//           sub_month.push(test);
//         }
//         var all_month = [];
//         for (var sub of all_promotions) {
//           var test = month_en.find((m, index) => {
//             if (index + 1 == sub.month) return sub.month;
//           });
//           all_month.push(test);
//         }
//         unique_sub_month = [...new Set(sub_month)]
//         unique_all_month = [...new Set(all_month)]
//     }
    
//     else {
//       var main_month;
//       console.log("main_promotions :: ", main_promotions[0].month);
//       for (let i = 0; i < month_th.length; i++) {
//         if (i + 1 == main_promotions[0].month) {
//           main_month = month_th[i];
//         }
//       }

//       var sub_month = [];
//       for (var sub of sub_promotions) {
//         var test = month_th.find((m, index) => {
//           if (index + 1 == sub.month) return sub.month;
//         });
//         sub_month.push(test);
//       }
//       var all_month = [];
//       for (var sub of all_promotions) {
//         var test = month_th.find((m, index) => {
//           if (index + 1 == sub.month) return sub.month;
//         });
//         all_month.push(test);
//       }
//       unique_sub_month = [...new Set(sub_month)]
//       unique_all_month = [...new Set(all_month)]
//     }

//     // console.log("sub_month: ", sub_month);
//     // console.log("all_month: ", all_month);
//     console.log("main_month :: ", main_month);
//     console.log("unique_sub_month :: ", unique_sub_month);
//     console.log("unique_all_month :: ", unique_all_month);

//     var result_all_promotions = all_promotions.reduce((x, y) => {

//         (x[y.month] = x[y.month] || []).push(y);

//         return x;

//     }, {});
//     var result_sub_promotions = sub_promotions.reduce((x, y) => {
//         // console.log('yy',y);
//         // console.log('xx',x);
//         (x[y.month] = x[y.month] || []).push(y);

//         return x;

//     }, {});

//     return {
//       main_promotions: { main_promotions, main_month },
//       sub_promotions: { result_sub_promotions, unique_sub_month },
//       all_promotions: { result_all_promotions, unique_all_month },
//     };

//     //   var result = all_promotions.reduce((x, y) => {

//     //       (x[y.month] = x[y.month] || []).push(y);

//     //       return x;

//     //   }, {});

//     //   console.log(result);
    
//     //     return {
//     //   main_promotions: main_promotions,
//     //   sub_promotions: sub_promotions,
//     //   all_promotions: all_promotions,
//     //   results:result
//     // };
//   } catch (err) {
//     console.log(err.message);
//   }
// }
//todo:test
//! :: ---------

async function find(language) {
  try {
    const date = new Date();
    console.log("this is promotions/:language service");
    console.log("language :", language);
    var arr_attribute = ["id", "month","alt","date_order"];

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
    console.log('month: ', month);
    //*-----main promotions
    var find_main_promotions = await promotions.findAll({
      where: {
        month: month,
        enable:true
      },
      attributes: arr_attribute,
      order: [[db.Sequelize.col("month"), "ASC"]],
      raw:true
    });
    let main_promotions
    if (language == "en") {
      main_promotions = {
        month:month_en[date.getMonth()],
        date:find_main_promotions[0].date_order,
        promotions:find_main_promotions        
      }
    } else if (language == "cn") {
      main_promotions = {
        month:month_cn[date.getMonth()],
        date:find_main_promotions[0].date_order,
        promotions:find_main_promotions        
      }
    } else {
      main_promotions = {
        month:month_th[date.getMonth()],
        date:find_main_promotions[0].date_order,
        promotions:find_main_promotions        
      }
    }
    //*-----sub promotions
    let sub_promotions = []
    for(let i=0;i<month_th.length;i++){
      let month_promotions = await promotions.findAll({
        where: {
          // month:i+1
          month:{
            [Op.not]: month,
            [Op.eq]: i+1
          },
          enable:true
        },
        attributes: arr_attribute,
        raw:true,
        // order: [[db.Sequelize.col("date_order"), "DESC"]]
      })
      if(month_promotions.length > 0){
        if (language == "en") {
          sub_promotions.push({
            month:month_en[i],
            date:month_promotions[0].date_order,
            promotions:month_promotions
          })
        } else if (language == "cn") {
          sub_promotions.push({
            month:month_cn[i],
            date:month_promotions[0].date_order,
            promotions:month_promotions
          })
        } else {
          sub_promotions.push({
            month:month_th[i],
            date:month_promotions[0].date_order,
            promotions:month_promotions
          })
        }
      }
    }
    sub_promotions.sort((a, b) => {
      let da = new Date(a.date),
          db = new Date(b.date);
      return db - da;
    });

    //*-----all promotions
    // let all_promotions = []
    // for(let i=0;i<month_th.length;i++){
    //   let month_promotions = await promotions.findAll({
    //     where: {
    //       month:i+1
    //     },
    //     attributes: arr_attribute,
    //     raw:true,
    //   })
    //   if(month_promotions.length > 0){
    //     if (language == "en") {
    //       all_promotions.push({
    //         month:month_en[i],
    //         date:month_promotions[0].date_order,
    //         promotions:month_promotions
    //       })
    //     } else if (language == "cn") {
    //       all_promotions.push({
    //         month:month_cn[i],
    //         date:month_promotions[0].date_order,
    //         promotions:month_promotions
    //       })
    //     } else {
    //       all_promotions.push({
    //         month:month_th[i],
    //         date:month_promotions[0].date_order,
    //         promotions:month_promotions
    //       })
    //     }
    //   }
    // }
    // all_promotions.sort((a, b) => {
    //   let da = new Date(a.date),
    //       db = new Date(b.date);
    //   return db - da;
    // });

    return {
      main_promotions: main_promotions,
      sub_promotions: sub_promotions,
      date:date
      // all_promotions: all_promotions,
    };

  } catch (err) {
    console.log(err.message);
  }
}
module.exports = {
  find,
};
