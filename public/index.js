$(document).on("click", "#postfreet", function() {
  // On create button click, POST to /links to make shortening and then redirect to URL.
  $.post("/makefreet", {
    "username": $("#username").val(),
    "freet": $("#freet").val(),
  }, function(data) {
    alert("Posted freet");
  });
});
