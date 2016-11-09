var express = require("express");
var handlebars = require("express-handlebars")
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var routes = require('./routes/index');
var userrouter = require('./routes/userrouter');
var freetrouter = require('./routes/freetrouter');

var usermodel = require("./models/users");
var freetmodel = require("./models/freets");

//Database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/activitydb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected");
});

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({secret: "6170secret", resave : true, saveUninitialized : true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.all('*', function(req, res, next) {
  if(req.url == "/" && ((typeof req.session.currentuser == "undefined") || (req.session.currentuser == ""))){
    res.render("login");
  } else{
    next();
  }
});

app.use('/', routes);
app.use('/user', userrouter);
app.use('/freet', freetrouter);

// app.listen(process.env.PORT || 3000, function() {
//   console.log("Listening on port 3000");
// });


module.exports = app;
