var express = require("express")
var router = express.Router();
var freet = require("../models/freets.js");
var user = require("../models/users.js")

/***
 *  Store a new freet
 ***/
router.post("/", function(req, res, next){
  var uname = req.session.currentuser;
  var text = req.body.freet;
  var t = Date.now();

  freet.create({"username": uname,
                "freet": text,
                "time": t},
                function(err, r){
                  if(err){
                    res.json({
                      "message": "Storing that freet didn't work. Check it and try again!" + err,
                      "success": false
                    });
                  }
                else{
                  res.redirect('/freet/');
                }
              });
});

/***
 *  Store a refreet
 ***/
router.post("/rf", function(req, res, next){
  var uname = req.session.currentuser;
  var id = req.body.id;
  freet.findById(id, function(err, doc){
    if(err){
      res.json({
        "message": "There was an error that prevented this refreet",
        "success": false
      });
    } else{
      var t = Date.now();
      var uname = req.session.currentuser;
      freet.create({"username": uname,
                    "freet": "RF: [" + doc.username + "] - " + doc.freet,
                    "time": t},
                    function(err, r){
                      if(err){
                        res.json({
                          "message": "Storing that freet didn't work. Check it and try again!" + err,
                          "success": false
                        });
                      }
                    else{
                      res.redirect('/freet/');
                    }
                  });
    }
  })
});

/***
 *  Delete a freet
 ***/
router.delete("/", function(req, res, next){
  var id = req.body.id;
  freet.findById(id, function(err, doc){
    if(doc){
      if(req.session.currentuser != doc.username){
        res.json({
          "message": "Sorry! You can't delete other people's freets! That would make them sad :(",
          "success": false
        });
      } else{
        freet.findByIdAndRemove(id, function(err, callback){
          if(err){
            res.json({
              "message": "Sorry! Something went wrong deleting that freet :(",
              "success": false
            });
          }
          res.json({"success": true})
        })
      }
    }
  })
});

/***
 *  Retrieve all freets
 ***/
router.get("/", function(req, res, next){
  freet.find({}).sort({"id": -1}).exec(function(err, freetlist){
    if(err){
      console.log(err);
    }
    res.render("dashboard", {
      name: req.session.currentuser,
      freets: freetlist,
      filterstatus: "all"
    })
    //res.json({"freets": freetlist});
  });
});

/***
 *  Retrieve only the freets of the authors this user follows
 ***/
router.get("/followedtweets", function(req, res, next){
  //find who this user follows
  user.findFollows(req.session.currentuser, function(err, doc){
    //get the freets from the people who are followed
    freet.find({username:{$in: doc}}).sort({"time": -1}).exec(function(err, freetlist){
      if(err){
        res.json({
          "message": "The database sent back an error. Please try again!",
          "success": false
        })
        // res.send("The database sent back an error. Please try again!");
      }
      else{
        res.render("dashboard", {
          name: req.session.currentuser,
          freets: freetlist,
          filterstatus: "followed"
        })
        // res.json({"freets": freetlist});
      }
    })
  });
});

module.exports = router;
