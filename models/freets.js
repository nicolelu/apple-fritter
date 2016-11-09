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

/**
 * Store freet in db
 * @param username: username of author
 * @param freet: text of freet
 * @param time: time the freet was created
 * @param callback: asynchronous callback function that tells the function what to do
 * with any results (both valid and erroneous results)
 */
freetSchema.statics.createFreet = function(username, freet, time, callback){
  this.create({"username": username,
                "freet": freet,
                "time": time}, function(error, doc){
                  if (error){
                    callback(true);
                  } else{
                    callback(false);
                  }
                });
};

/**
 * Delete freet in db
 * @param id: id of freet to be deleted
 * @param callback: asynchronous callback function that tells the function what to do
 * with any results (both valid and erroneous results)
 */
freetSchema.statics.deleteFreet = function(id, callback){
  //Don't need to check whether the usernames match because that
  //logic is handled in jQuery (from Part 1)
  this.findByIdAndRemove(id, function(err){
    if(err){
      callback(false);
    } else{
      callback(true);
    }
  })
};

/**
 * Get all freets in db
 * @param callback: asynchronous callback function that tells the function what to do
 * with any results (both valid and erroneous results)
 */
freetSchema.statics.getFreets = function(callback){
  return this.find({}).sort({"time": -1}).exec(function(error, doc){
    if (!doc || error){
      callback(true, null);
    } else{
      callback(false, doc);
    }
  })
};

/**
 * Get only freets posted by certain users
 * @param usernamelist: array of users whose freets we want
 * @param callback: asynchronous callback function that tells the function what to do
 * with any results (both valid and erroneous results)
 */
freetSchema.statics.getFollowingFreets = function(usernamelist, callback){
  this.find({"username": {$in: usernamelist}}).sort({"time": -1}).exec(function(error, doc){
    if (!doc || error){
      callback(true, null);
    } else{
      callback(false, doc)
    }
  })
};

/**
 * Get specific freet
 * @param freetID: id of freet we are looking for
 * @param callback: asynchronous callback function that tells the function what to do
 * with any results (both valid and erroneous results)
 */
freetSchema.statics.getFreet = function(freetId, callback){
  this.findOne({_id: freetId, function(error, doc){
    if (!doc || error){
      callback(true, null);
    } else{
      callback(false, doc)
    }
  }
})};

module.exports = mongoose.model("freet", freetSchema);
