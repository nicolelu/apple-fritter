$(document).on("click", "#del", function () {

            console.log("delete clicked")

            var delObject = $(this).attr("value");

            var query = new Parse.Query(Contact);
            query.get(delObject, {
                success: function (delObj) {
                    // The object was retrieved successfully.
                    delObj.destroy({});
                    window.location = "index.html";
                },
                error: function (object, error) {
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and description.
                    alert("Error: " + error.code + " " + error.message);
                }
            });

        });
