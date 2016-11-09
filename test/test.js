var assert = require("assert");
var mongoose = require("mongoose");
var freet = require("../models/freets.js");
var user = require("../models/users.js");

// Fritter is the module under test.
describe('Fritter', function() {
// logging in is the method under test.
describe('logging in and creating users', function () {
  before(function (done) {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
  });

  // This is a test, we indicate what we're testing for.
  it('visually check the site prompts log in if not already logged in', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
  });

  // This is a test, we indicate what we're testing for.
  it('visually check that user is logged in', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
  });

  // This is a test, we indicate what we're testing for.
  it('visually check the site remembers when someone is logged in and does not prompt them to log in again', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
  });

  // This is a test, we indicate what we're testing for.
  it('visually check that after we log out, the site does not remember us when we come back (prompts us to log in)', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
  });

  // This is a test, we indicate what we're testing for.
  it('Looking for a user that does not exist should not work', function () {
    user.find({"username": "fakename1"}).exec(function(err, result){
      if(err){
        assert.equal(-1, [1,2,3].indexOf(5));
      } else {
        assert.equal(-1, 0);
      }
    });
  });

  // This is a test, we indicate what we're testing for.
  it('creating a user and looking for it should work', function () {
    user.create({
      "username": "testname",
      "password": "password",
      "follows": []
    }, function(err, doc){
      if(err){
        console.log(err);
      }
    });
    user.find({"username": "testname"}).exec(function(err, result){
      if(err){
        assert.equal(-1, 0);
      } else {
        assert.equal(result.username, "testname");
      }
    });
  });

  // This is a test, we indicate what we're testing for.
  it('verifying a correct password yields expected response', function () {
    user.find({"username": "testname", "password": "password"}).exec(function(err, result){
      if(err){
        console.log(error);
      }
      if(result.length < 1){
        assert.equal(-1,0);
      }
      else{
        assert.equal(result.username, "testname");
        assert.equal(result.password, "password");
      }
    })
  });

  // This is a test, we indicate what we're testing for.
  it('verifying an incorrect password yields expected response', function () {
    user.find({"username": "testname", "password": "wrongpassword"}).exec(function(err, result){
      if(err){
        console.log(error);
      }
      if(result.length < 1){
        assert.equal(0,0);
      }
      else{
        assert.equal(0, 1);
      }
    })
  });

  // This is a test, we indicate what we're testing for.
  it('Following a user should work if the user exists', function () {
    user.create({
      "username": "followme",
      "password": "password",
      "follows": []
    }, function(err, doc){
      if(err){
        console.log(err);
      }
    });
    user.followUser("testname", "followme", function(err, result){
      if(err){
        assert.equal(0, 1);
      } else{
        assert.equal(result.follows[0], target);
      }
    })
  });

  // This is a test, we indicate what we're testing for.
  it('Nothing bad should happen if a user tries to follow a user they already follow (the user should also not be added twice)', function () {
    user.followUser("testname", "followme", function(err, result){
      if(err){
        assert.equal(0, 1);
      } else{
        assert.equal(result.follows[0], target);
        assert.equal(result.follows.length, 1);
      }
    })
  });

  // This is a test, we indicate what we're testing for.
  it('Following a user should not work if either user does not exist', function () {
    user.followUser("testname", "fakeuser101", function(err, result){
      if(err){
        assert.equal(0, 0);
      } else{
        assert.equal(0, 1);
      }
    })

    user.followUser("fakeuser101", "testname", function(err, result){
      if(err){
        assert.equal(0, 0);
      } else{
        assert.equal(0, 1);
      }
    })
  });


});

// posting tweet is the method under test.
describe('posting tweet', function () {
  before(function (done) {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
  });

  // This is a test, we indicate what we're testing for.
  it('Get freets when the db is empty', function () {
    freet.find({}).exec(function(err, freetlist){
      if(err){
        console.log(err);
      }
      assert.equal(freetlist.length, 0);
      //res.json({"freets": freetlist});
    });
  });

// This is a test, we indicate what we're testing for.
  it('visually check that tweet is posted correctly', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
  });

  // This is a test, we indicate what we're testing for.
  it('Check that freet is stored in db correctly (db empty beforehand)', function () {
    freet.create({"username": "testuser",
                  "freet": "this is a test tweet",
                  "time": Date.now()},
                  function(err, r){
                    if(err){
                      console.log(err);
                    }
                });
    freet.find({}).exec(function(err, freetlist){
      if(err){
        console.log(err);
      }
      assert.equal(freetlist.length, 1);
      //res.json({"freets": freetlist});
    });
  });

  // This is a test, we indicate what we're testing for.
  it('Check that freet is stored in db correctly (db not empty beforehand)', function () {
    freet.create({"username": "testuser2",
                  "freet": "this is a test tweet2",
                  "time": Date.now()},
                  function(err, r){
                    if(err){
                      console.log(err);
                    }
                });
    freet.find({}).exec(function(err, freetlist){
      if(err){
        console.log(err);
      }
      assert.equal(freetlist.length, 2);
      //res.json({"freets": freetlist});
    });
  });

  // This is a test, we indicate what we're testing for.
  it('Check that nothing bad happens when two identical freets are stored', function () {
    freet.create({"username": "testuser",
                  "freet": "this is a test tweet",
                  "time": Date.now()},
                  function(err, r){
                    if(err){
                      console.log(err);
                    }
                });
    freet.find({}).exec(function(err, freetlist){
      if(err){
        console.log(err);
      }
      assert.equal(freetlist.length, 3);
      //res.json({"freets": freetlist});
    });
  });
});

// delete tweets is the method under test.
describe('deleting tweets', function() {

  // This is a test, we indicate what we're testing for.
    it('visually check that freets are deleted correctly (since freets needed to be deleted by ID, which are randomly generated every time)', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
    });

}); // End describe map.

}); // End describe Array.
