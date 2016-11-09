var mongoose = require("mongoose");

/**
 * Declare schema for users
 * @param username: username of user
 * @param password: password of user
 * @param follows: array of users this user follows
 */
var userSchema = mongoose.Schema({
  username:{
    type: String,
    required: true,
    index:{
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  follows: [String]
});

/**
 * Finds a user in the db
 * @param uname: username of freet author
 */
userSchema.statics.findUser = function(uname, callback){
  this.findOne({
    username: uname
  },
  function(error, user){
    if(error || !user){
      callback(false, null);
    } else{
      callback(true, user);
    }
  }
);};

/**
 * Executes the process for one user following another user
 * @param follower: username of user trying to follow the other
 * @param target: username of the user that is the target of following
 * @param callback: asynchronous callback function that tells the function what to do
 * with any results (both valid and erroneous results)
 */
userSchema.statics.followUser = function(follower, target, callback){
  this.find({username: follower}, function (err, doc){
    mongoose.model("User").findOne({username: target}, function(seconderr, seconddoc){
      if(seconderr){
        callback(seconderr);
      }
      if(err){
        callback(err);
      }
      else if(!seconddoc){
        callback("Could not find the target user");
      }
      else if(doc[0].follows.indexOf(target) >= 0){
        callback("You are already following this person");
      }
      else{
        doc[0].follows.push(target);
        mongoose.model("User").update({username: follower}, {follows: doc[0].follows}, callback);
      }
    })
  })
}

/**
 * Finds all the users that this user follows
 * @param uname: username of user
 */
userSchema.statics.findFollows = function(uname, callback){
  this.findOne({
    username: uname
  },
  function(error, user){
    if(error || !user){
      callback(false, null);
    } else{
      callback(true, user.follows);
    }
  }
);};

/**
 * Checks the password of a user
 * @param uname: username of user
 * @param pass: password to be checked
 */
userSchema.statics.checkPassword = function(uname, pass, callback){
  this.findUser(uname, function(exists, user){
    if(exists){
      if(user.password == pass){
        callback(null, true);
      }else{
        callback(null, false);
      }
    } else{
      callback(null, false);
    }
  });};

module.exports = mongoose.model("User", userSchema);
