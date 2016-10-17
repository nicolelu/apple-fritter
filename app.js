var express = require("express");
var handlebars = require("express-handlebars")
var bodyParser = require('body-parser');
var path = require("path");
var persist = require("./persist.js");
var name = "";

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));



app.get("/", function(req, res){
    res.render('login');
});

app.get("/allfreets", function(req, res){
    res.json(persist.getfreets());
});

app.get("/index", function(req, res){
  name = req.body.username;
  res.render('index', {
    name: req.body.username,
    freets: persist.getfreets()
  });
});

app.get("/dashboard", function(req, res){
  res.render('dashboard', {
    name: req.body.name,
    freets: persist.getfreets()
  });
});

app.post("/index", function(req, res){
  res.render('index', {
    name: req.body.name,
    freets: persist.getfreets()
  });

});

app.post("/dashboard", function(req, res){
  var freet = persist.add(req.body.username, req.body.freet, function(res) {
  console.log(res);
});
  res.render('dashboard', {
    name: req.body.username,
    freets: persist.getfreets()
  });
});

app.delete("/dashboard", function(req, res){
  var freet = persist.delete(req.body.id);
  res.render('dashboard', {
    name: req.body.name,
    freets: persist.getfreets()
  });
});

app.post("/makefreet", function(req, res){
  var freet = persist.add(req.body.username, req.body.freet, function(res) {
  console.log(res);
});
  persist.makefreet(function() {
    res.json({"username": req.body.username, "freet": req.body.freet});
  });
});

app.delete("/deletefreet", function(req, res){
  var freet = persist.delete(req.body.id);
  persist.makefreet(function() {
    res.json({"username": req.body.username, "freet": req.body.freet});
  });
});

app.post("/freets", function(req, res) {
  var freet = persist.add(req.body.username, req.body.freet, function(res) {
  console.log(res);
});
  persist.persist(function() {
    res.json({"username": req.body.username, "freet": req.body.freet});
  });
});

app.all('*', function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port 3000");
});
