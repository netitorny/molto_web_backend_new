const db = require("./../config/sqlconfig");

const { QueryTypes } = require("sequelize");
const { users } = db;

const jwt = require("../services/jwt.service");

db.sequelize.sync();



async function signIn(user) {
  try {
    //* user.username / password
  console.log('This is ',user);
  var found = await users.findOne({
    where:{
        username: user.username
    }
    })
  if (found) {
    // var isValid = await bcrypt.compare(user.password, found.password);
    var isValid = user.password === found.password;
    if (isValid) {
        console.log("user and password is match")
        var token = jwt.signToken({
        id: found.id,
        username: found.username
      });
      console.log("token is ",token);
      console.log("\ncomplete");
      return {
                token : token,
                data : found,
                login_status : true
             }
    }
    else {
        console.log("password is not match")
        return false;
    }
  }

  else{
    return false;
  }
  } catch (error) {
    
  }
  
}

async function signOut(user) {
    console.log("sign out service");
    
}


async function register(user) {
  hashed = await bcrypt.hash(user.password, 12);
}

module.exports = {
  signIn,
  register,
  signOut
};
