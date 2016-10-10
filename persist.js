var fs = require("fs");

var DEFAULT_FILENAME = "fritter.json";

var id = 3;

var Persister = function(filename) {
  var that = Object.create(Persister);
  var freets = [{"username": "Nathan", "freet": "I am but a bear", "id": 1},
                {"username": "Clark", "freet": "But I am a nice bear", "id": 2}]

  that.getfreets = function(){
    return freets;
  };

  that.add = function(username, text) {
    //short = short ? short : chance.word();
    freets.push({"username": username, "freet": text, "id": id});
    id = id + 1;
    console.log(freets);
    return text;
  };

  that.delete = function(id){
    freets = freets.filter(function(freet){
      return freet.id != id;
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
