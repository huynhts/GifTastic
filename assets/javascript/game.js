//userSearch variable will store all of the user searches
var userSearch = ['kobe', 'steph curry', 'james harden'];
//create global variable to store gif still and animated links/state
var gifAnimateLink = '';
var gifStillLink = '';


//create buttons for gif searches
function createButtons () {

    //clears out buttons
    $(".button-space").html("");

    //for loop to create buttons based on userSearch variable
    for (var i = 0; i < userSearch.length; i++){
        var buttons = $('<button>');
        buttons.text(userSearch[i]);
        buttons.attr('id','gifButton');
        buttons.attr('gif-name', userSearch[i]);
        $('.button-space').prepend(buttons);
    }

    $('.form-control').val('');
};



//on click function that creates button based on user search
$('.search-button').on('click', function(){

    //takes user input and creates button
    var userInput = $('.form-control').val().trim();
    userSearch.push(userInput);
    createButtons();

    console.log(userSearch);
});

//on click function triggers an AJAX giphy API search. it will also create an image tag per gif result and add class values
$(document).on('click', '#gifButton', function(){
    event.preventDefault();

    var gifSearch = $(this).attr('gif-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=gA7IWPO3GArxJLy1LXZuqXAOCdSH1P6o&rating=g&q=" + gifSearch + "&limit=10";
    

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var rating = results[i].rating;

            var divGif = $('<div>');
            divGif.attr('class', 'gif-Div');
            var pGif = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("class", 'gif-Image');
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', 'still');


            divGif.append(pGif);
            divGif.append(gifImage);

            $(".gif-space").prepend(divGif);
          }
        });

});

$(document).on('click', '.gif-Image', function() {

    var state = $(this).attr('data-state');
    var animatedUrl = $(this).attr('data-animate');
    var stillUrl = $(this).attr('data-still');

    if (state === 'still') {
      $(this).attr('src', animatedUrl);
      $(this).attr('data-state', 'animated');
    } else {
      $(this).attr('src', stillUrl);
      $(this).attr('data-state', 'still');
    }
  });