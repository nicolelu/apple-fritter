var assert = require("assert");
var persist = require("../persist.js");

// Fritter is the module under test.
describe('Fritter', function() {
// logging in is the method under test.
describe('logging in', function () {

  // This is a test, we indicate what we're testing for.
  it('visually check that user is logged in', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
  });

});

// posting tweet is the method under test.
describe('posting tweet', function () {

  // This is a test, we indicate what we're testing for.
  it('no tweets yet', function () {
    persist.add("user1", "sample text", function(res){
      console.log(res);
    })
    freets = persist.getfreets();
    assert.equal(freets.length, 1);
    assert.equal(freets[0].username, "user1");
    assert.equal(freets[0].freet, "sample text");
    assert.equal(freets[0].id, 1);
  });
    
// This is a test, we indicate what we're testing for.
  it('visually check that tweet is posted correctly', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
  });

  // This is a test, we indicate what we're testing for.
  it('more than 1 tweet by same author & same tweet text (id should be different)', function () {
    persist.add("user1", "sample text", function(res){
      console.log(res);
    })
    freets = persist.getfreets();
    assert.equal(freets.length, 2);
    assert.equal(freets[1].username, "user1");
    assert.equal(freets[1].freet, "sample text");
    assert.equal(freets[1].id, 2);
  });

  // This is a test, we indicate what we're testing for.
  it('tweets by different authors', function () {
    persist.add("user2", "sample text", function(res){
      console.log(res);
    })
    freets = persist.getfreets();
    assert.equal(freets.length, 3);
    assert.equal(freets[2].username, "user2");
    assert.equal(freets[2].freet, "sample text");
    assert.equal(freets[2].id, 3);
  });

});

// delete tweets is the method under test.
describe('deleting tweets', function() {

  // Deleting a tweet when that exists
  it('deleting a tweet that exists - in the middle of the list', function () {
    persist.delete(2);
    freets = persist.getfreets();
    assert.equal(freets.length, 2);
    assert.equal(freets[1].username, "user2");
    assert.equal(freets[1].freet, "sample text");
    assert.equal(freets[1].id, 3);
  });

  // Deleting a tweet when that exists
  it('deleting a tweet that exists - at the end of the list', function () {
    persist.delete(3);
    freets = persist.getfreets();
    assert.equal(freets.length, 1);
    assert.equal(freets[0].username, "user1");
    assert.equal(freets[0].freet, "sample text");
    assert.equal(freets[0].id, 1);
  });

  // Deleting a tweet when that exists
  it('deleting a tweet that exists - at the beginning of the list', function () {
    persist.delete(1);
    freets = persist.getfreets();
    assert.equal(freets.length, 0);
  });

  // Deleting a tweet when that exists
  it("deleting a tweet that doesn't exist", function () {
    persist.delete(5);
    freets = persist.getfreets();
    assert.equal(freets.length, 0);
  });


}); // End describe map.

}); // End describe Array.

