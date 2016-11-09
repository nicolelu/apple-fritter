var express = require("express");
var router = express.Router();
var user = require("../models/users.js");

/***
 * Create a new account when the user posts from the account creation form
 ***/
router.post("/newaccount", function(req, res, next){
   var uname = req.body.name;
   var pass = req.body.password;

   if(uname.includes(" ")){
     res.render("error", {
       msg: "Sorry! Please try a username without spaces :)"
     })
   }else{
     user.createUser(uname, pass, function(status, message){
       if(status == false){
         res.render("error", {
           msg: message
         })
       } else{
         req.session.currentuser = uname;
         res.redirect('/freet/');
       }
     })
 }
 });

/***
 * Handles post from user clicking "log in" button on login page
 ***/
router.post("/index", function(req, res, next){
  var uname = req.body.name;
  var pass = req.body.password;
  user.checkPassword(uname, pass, function(err, status){
    if(status){
      req.session.currentuser = uname;
      res.redirect('/freet/');
    } else{
      res.render("error", {
        msg: "Either your username or password were incorrect. Please try again!"
      })
    }
  })
});

/***
 * Handles post from user clicking "log out" button
 ***/
router.post("/logout", function(req, res){
   req.session.currentuser = "";
   res.redirect("/");
 });

/***
 * Handles one user trying to follow another user
 ***/
router.post("/followuser", function(req, res, next){
  var target = req.body.target;

  user.followUser(req.session.currentuser, target, function(err, result){
    if(err){
      res.render("error", {
        msg: "There was an error trying to follow this user. Please go back and try again"
      })
    }
  })
});

module.exports = router;
