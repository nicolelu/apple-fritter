var mongoose = require("mongoose");

/**
 * Declare schema for freets
 * @param username: username of freet author
 * @param freet: text of the freet
 * @param time: time that freet is stored in db
 */
var freetSchema = mongoose.Schema({
username: {
  type: String,
  required: true
},
freet: {
  type: String,
  required: true
},
time: {
  type: Number,
  required: true
}
});

freetSchema.statics.getFreets = function(callback){
  return this.find({}, function(error, results){
    if (!result || error){
      callback(true, null);
    } else{
      callback(false, result)
    }
  })
};

freetSchema.statics.getFollowingFreets = function(usernamelist, callback){
  this.find({"username": {$in: usernamelist}}, function(error, results){
    if (!result || error){
      callback(true, null);
    } else{
      callback(false, result)
    }
  })
};

freetSchema.statics.getFreet = function(freetId, callback){
  this.findOne({_id: freetId, function(error, results){
    if (!result || error){
      callback(true, null);
    } else{
      callback(false, result)
    }
  }
})};

module.exports = mongoose.model("freet", freetSchema);
