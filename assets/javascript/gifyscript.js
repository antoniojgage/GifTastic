$(document).ready(function() {

    var options = ["thor", "batman", "superman", "green arrow", "wolverine", "spider man", "captain america", "martian manhunter", "flash", "robin", "daredevil"];
    createButtons();

    function createButtons() {
        $(".gifButtons").empty();
        for (i = 0; i < options.length; i++) {
            $(".gifButtons").prepend("<button class='btn-primary gifSearch center'>" + options[i] + "</button>");
        }
    }

    function emptyData() {
        $("#gifs-appear-here").empty();
    }

    function queryData() {
        var selected = $(this).text();
        console.log("selected= " + selected);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            selected + "&api_key=dc6zaTOxFJmzC&limit=5";
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    };
    $("#add-option").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var option = $("#buttonInput").val().trim();
        // Adding the movie from the textbox to our array
        options.push(option);
        console.log("Adding: " + option);
        // Calling renderButtons which handles the processing of our movie array
        createButtons();
    });
    $(document).on("click", ".gifSearch", queryData);
    $(document).on("click", "#Clear_Result", emptyData);
}); //end of code
