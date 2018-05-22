/*

listener checks on button hovers, to activate modal
listener checks on button clics, to retrieve GIFs
GIFs should be added, each, nested on a column, no more than 6 on a columns div

*/

//Input field listener to add new person
$("#button-add-person").on("click", function() {
    /*
    PERSON EXISTS?
    YES
        - disable button, give tooltip
    NO
        - check last columnS
        - go into it
        - check last column
        - <= 5?
            - TRUE
                - create button in current columns until 6 buttons
            - FALSE
                - create new columnS and create 1st column / button
                add attributes to columns, column, and button
                .attr('data-person', 'value')
                .attr('data-column', 'value')
    */

    var currentColumns = $("#button-columns-2");

    var newPerson = $('#input-person');
    var newColumn = $("<div>");
    var newButton = $("<a>");

    newColumn.addClass("column");
    newButton.addClass("button");
    newButton.attr("data-person", newPerson.val());
    newButton.text(newPerson.val());

    newColumn.append(newButton);
    currentColumns.append(newColumn);

    newPerson.val("");


});
/*
$(".button").on("mouseover", function() {
    var person = $(this).attr("data-person");
    var queryURL = //should go to WIKI's page

    $.ajax({ //confirm the method
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        //Do the actual logic to fill, and show the modal.

      });
  });
  */

//Listener for button click, creates the GIFs
$(".button").on("click", function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=3";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        //save the Array of GIFs in a variable
        var results = response.data;

        //create the div for columns
        var gifColumns = $("<div>");
        gifColumns.addClass("columns");

        $("#gifs").prepend(gifColumns);

        for (var i = 0; i < results.length; i++) {

            //create the div for each column
            var gifColumn = $("<div>");
            gifColumn.addClass("column");
            gifColumn.addClass("has-text-centered");

            var gifImg = $("<img>");
            gifImg.attr("src", results[i].images.fixed_height.url);

            gifColumn.append(gifImg);
            gifColumns.append(gifColumn);
        }
    });
});

