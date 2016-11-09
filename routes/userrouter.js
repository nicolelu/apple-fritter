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
     //res.send("Sorry! Please try a username without spaces :)");
   }else{

   //see if username already exists
   user.find({"username": uname}).exec(function(err, result){
     if(err){
       res.render("error", {
         msg: "The database sent back an error. Please try again!"
       })
      //  res.send("The database sent back an error. Please try again!");
     }
     if(result.length >= 1){
       res.render("error", {
         msg: "Oh no, someone beat you to this username. Please try another one!"
       })
      //  res.send("Oh no, someone beat you to this username. Please try another one!");
     }
     else{
       user.create({
         "username": uname,
         "password": pass,
         "follows": []
       }, function(err, doc){
         if(err){
           res.render("error", {
             msg: "One or both of the username and password are invalid. Please try again!"
           })
          //  res.send("One or both of the username and password are invalid. Please try again!");
         }
         else{
           req.session.currentuser = uname;
           res.redirect('/freet/');
         }
       });
     }
   });
 }
 });

/***
 * Handles post from user clicking "log in" button on login page
 ***/
router.post("/index", function(req, res, next){
  var uname = req.body.name;
  var pass = req.body.password;
  user.find({"username": uname, "password": pass}).exec(function(err, result){
    if(err){
      res.render("error", {
        msg: "The database sent back an error. Please try again!"
      })
      // res.send("The database sent back an error. Please try again!");
    }
    if(result.length < 1){
      res.render("error", {
        msg: "Either your username or password were incorrect. Please try again!"
      })
      // res.send("Either your username or password were incorrect. Please try again!");
    }
    else{
      req.session.currentuser = uname;
      res.redirect('/freet/');
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
      // res.send("There was an error trying to follow this user. Please go back and try again");
    }
  })
});

module.exports = router;
