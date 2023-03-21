const express = require("express");
const router = express.Router();

const authService = require('../services/auth.service')


router.post("/signin", async (req, res) => {
  try {
    console.log("singin route")
    // console.log("body",req.body.username)
    
    res.json(await authService.signIn(req.body));
  } catch (err) {
    res.json(err);
    //console.log(err)
  }
});

router.post("/signout", async (req, res) => {
    try {
        console.log("sing out route")
        // console.log("body",req.body)
        
        res.json(await authService.signOut(req.body));
    } catch (error) {
        res.json(err)
    }
})

module.exports = {
  router
}
