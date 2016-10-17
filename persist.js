var fs = require("fs");

var DEFAULT_FILENAME = "fritter.json";

var id = 1;

/**
 * Represents a instance of persistent freet storage.
 * @param {string} filename - The filename under which to save the freets as a json object. Default value is DEFAULT_VALUE above.
 */
var Persister = function(filename) {
  filename = filename || DEFAULT_FILENAME;
  var that = Object.create(Persister);
  var freets = []

  try{
    JSON.parse(fs.readFileSync(DEFAULT_FILENAME)).forEach(function(item){

      freets.push({"username": item[0], "freet": item[1], "id": item[2]});
    });
  }catch(ex){

  };


  /**
   * Read the file and parse the result as a JavaScript object.
   * @param {Function} callback - The function to execute after the object
   *  has been read. It is executed as callback(err, object), where
   *  err is the error object and null if there is no error and where object
   *  is the object read from the file. It is undefined if err is not null.
   */
  that.getfreets = function() {
    return freets;
  };


  /**
   * Add a freet to our array and persist that array to a file
   * @param {string} username - The username of the freeter
   * @param {string} text - The text of the freet
   * @param {Function} callback - The function to execute after the object
   *  has been read. It is executed as callback(err, object), where
   *  err is the error object and null if there is no error and where object
   *  is the object read from the file. It is undefined if err is not null.
   *
   * This function assigns a unique id number to the freet which will later be used
   * to uniquely identify it for deleting
   */
  that.add = function(username, text, callback) {
    freets.push({"username": username, "freet": text, "id": id});
    id = id + 1;
    that.writefreetstojson(callback);
    return text;
  };

  /**
   * Persist out freets to a file
   * @param {Function} callback - The function to execute after the object
   *  has been read. It is executed as callback(err, object), where
   *  err is the error object and null if there is no error and where object
   *  is the object read from the file. It is undefined if err is not null.
   */
  that.writefreetstojson = function(callback){
    freetsave = []
    freets.forEach(function(f){
      freetsave.push([f.username, f.freet, f.id]);
    });
    fs.writeFile(DEFAULT_FILENAME, JSON.stringify(freetsave), callback ? callback : function() {});
  }

  /**
   * Delete a freet
   * @param {number} id - The unique id number of the freet
   *
   */
  that.delete = function(id){
    freets = freets.filter(function(freet){
      return freet.id != id;
    });
    that.writefreetstojson(function(res){
      console.log(res);
    });
    return freets;
  };

  that.makefreet = function(callback){
    //freets.push({"username": username, "freet": text});

    //callback();
    fs.writeFile(DEFAULT_FILENAME, JSON.stringify(freets), callback ? callback : function() {});

  };

  /**
   * Write the given JavaScript object to a file.
   * @param {Object} object - The object to write to a file.
   * @param {Function} callback - The function to execute after the object
   *  has been written to a file. It is executed as callback(err), where
   *  err is the error object and null if there is no error.
   */
  that.persist = function(object, callback) {
    fs.writeFile(filename, JSON.stringify(object), callback);
  };

  /**
   * Read the file and parse the result as a JavaScript object.
   * @param {Function} callback - The function to execute after the object
   *  has been read. It is executed as callback(err, object), where
   *  err is the error object and null if there is no error and where object
   *  is the object read from the file. It is undefined if err is not null.
   */
  that.load = function(callback) {
    fs.readFile(filename, function(err, data) {
      if (err) {
        callback(err);
      } else {
        callback(null, JSON.parse(data.toString()));
      }
    });
  };

  Object.freeze(that);
  return that;
};

module.exports = Persister(DEFAULT_FILENAME);
