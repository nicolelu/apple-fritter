var express = require("express");
var router = express.Router();

/***
 *  Handles users going to the root page and decides where to send them
 *  based on the current session
 ***/
router.get("/", function(req, res, next) {
  if(typeof req.session.currentuser != "undefined" && req.session.currentuser != ""){
    res.redirect("/freet/");
  } else{
    res.render("login");
  }
});

module.exports = router;
