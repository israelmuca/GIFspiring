/*

listener checks on button hovers, to activate modal
listener checks on button clics, to retrieve GIFs
GIFs should be added, each, nested on a column, no more than 6 on a columns div

*/

$(document).ready(function() {

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
        newButton.addClass("gif-button");
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
    $("#buttons").on("click", ".gif-button", function() {
        var person = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=3";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            //save the Array of GIFs in a variable
            var results = response.data;

            //create and prepend a box for the group of GIFs
            var gifBox = $("<div>");
            gifBox.addClass("box");
            $("#gifs").prepend(gifBox);

            //create and prepend the div for columns
            var gifColumns = $("<div>");
            gifColumns.addClass("columns");
            gifBox.prepend(gifColumns);

            //create and prepend a tiny empty column at the beggining of columns
            var tinyColumn = $("<div>");
            tinyColumn.addClass("column");
            //tinyColumn.addClass("is-one");
            gifColumns.append(tinyColumn);

            //create nametag, write the name on it, append it
            var nametag = $("<div>");
            nametag.addClass("tags");
            nametag.addClass("has-addons");

            var name = $("<span>");
            name.addClass("tag");
            name.text(person);
            nametag.append(name);

            tinyColumn.append(nametag);

            //create and append each img column
            for (var i = 0; i < results.length; i++) {

                //create each column
                var gifColumn = $("<div>");
                gifColumn.addClass("column");
                gifColumn.addClass("has-text-centered");
                gifColumn.addClass("is-one-quarter");

                //create each img inside the column
                var gifImg = $("<img>");
                gifImg.attr("src", results[i].images.fixed_height.url);

                //append the img to the column and then to the columns
                gifColumn.append(gifImg);
                gifColumns.append(gifColumn);
            }

            //create and prepend a tiny column with a close button at the end of columns
            //will erase the div with the GIFs
            var tinyClosingColumn = $("<div>");
            tinyClosingColumn.addClass("column");
            //tinyClosingColumn.addClass("is-one");
            tinyClosingColumn.addClass("has-text-right");
            gifColumns.append(tinyClosingColumn);

            /*
            var nametag = $("<div>");
            nametag.addClass("tags");
            nametag.addClass("has-addons");

            var name = $("<span>");
            name.addClass("tag");
            name.text(person);
            nametag.append(name);

            var closeBtn = $("<a>");
            closeBtn.addClass("tag");
            closeBtn.addClass("is-delete");
            nametag.append(closeBtn);

            tinyClosingColumn.append(nametag);
            */

            var closingBtn = $("<button>");
            closingBtn.addClass("delete");
            closingBtn.attr("aria-label", "close");

            tinyClosingColumn.append(closingBtn);

        });
    });

    $("#gifs").on("click", ".delete", function() {
        $(this).parent().parent().parent().hide();
    });

});