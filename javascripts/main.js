"use strict";

let user = require("./user.js");
let domBuilder = require("./dom-builder.js");
let searchAPI = require("./searchAPI");
let dbInt = require("./db-interaction.js");

// movieArray is global array to hold whatever current collection of movies we want to
// display on DOM.  Could be filtered, or just initial API search, whatever.
// let movieArray = searchAPI.apiMovieArray;


//Was used for testing dom construction:
// let testArray = [
//           {"cast": ["Nicholas Cage", "Tom Cruise", "Matt Damon", "Jessica Biel", "Andre 3000" ],
//           "title": "Worst Movie Ever",
//           "id": "12345",
//           "img": "img/falloutvaultboythumbsup.jpg",
//           "releaseDate": "1901"
//             },
//           {"cast": ["Jim Brown", "Tico Tico", "Elvis Presley", "Johnny Depp", "Jim Carey" ],
//           "title": "Best Movie Ever",
//           "id": "54321",
//           "img": "img/falloutvaultboythumbsup.jpg",
//           "releaseDate": "2001"
//           }
// ];

// searchAPI.submitAPISearch("star%20wars");

// domBuilder.makeMovieCards(testArray);

/***** Event Listeners *****/

    /***NavBar***/

        //Find movies enter keyboard function id="searchInput"
        let inputAreaFunc = $('#searchInput').keypress(function(event){
            if (event.which == 13) {
                var input = $("#searchInput").val();
                // console.log("Search Input", input);
                input = input.replace(/ /g, "%20");
                // console.log("Search input to URL ->", input);
                searchAPI.submitAPISearch(input);
                // domBuilder.makeMovieCards(searchAPI.submitAPISearch(input));
            }
        });

        // //Find movies click button id="findMovie"
        // $("#findMovie").click(function(){
        //     console.log("clicked on Find Movie");
        // });

        // //Find my movies click button id="searchMyMovies"
        // $("#searchMyMovies").click(function(){
        //     console.log("clicked on Search My Movies");
        // });

        //Login button click id="loginBtn"
        $("#loginBtn").click(function(){
            // console.log("clicked on Signin");
            user.logInGoogle()
            .then((result) => {
                // console.log("result from login", result.user.uid);
                user.setUser(result.user.uid);
                $("auth-btn").addClass("is-hidden");
                $("#logout").removeClass("is-hidden");
                // loadMoviesToDOM();

            });
            $("#loginBtn").attr('disabled', true);
            $("#logoutBtn").attr('disabled', false);
        });

        //Logout button click id="logoutBtn"

        $("#logoutBtn").on('click', function(){
            // console.log("logout clicked");
            user.logOut();
            // loadMoviesToDOM();
            $("#logoutBtn").attr('disabled', true);
            $("#loginBtn").attr('disabled', false);
        });


    /******/

    /***Watched/Unwatched***/
let sliderArea = document.getElementById("slider-goes-here");
var slider = "<input type='range' min='0' max='10'>";
var watchedButton = document.getElementsByClassName("watched-button");
console.log("watched button", watchedButton);
console.log("slider area", sliderArea);


$(".watched-button").click(function(){
    console.log("button is clicked");
    sliderArea.innerHTML = "";
    cardArea.innerHTML = "";
    sliderArea.innerHTML += `<input type="range" min="0" max="10">`;
    dbInt.getSavedMovies();
});

$(".unwatched-button").click(function(){
    // cardArea.innerHTML = "";
    dbInt.watchedMovie();
});
        //Click Funtion for Watched button
        $("#watched").click(function(){
            // console.log("clicked on Watched toggle button");
            $('.breadcrumb').toggleClass('unwatched');
            $("#watched").attr('disabled', true);
            $("#unwatched").attr('disabled', false);
        });

        //Click Function for Unwatched button
        $("#unwatched").click(function(){
            // console.log("clicked on Unwatched toggle button");
            $('.breadcrumb').toggleClass('unwatched');
            $("#unwatched").attr('disabled', true);
            $("#watched").attr('disabled', false);
        });

    /******/

    /***Card Funtionality***/

        //Add to watch list
        //If logged in push to database/else login alert
$("#cardHolder").click((e)=> {
    console.log("the card's value", e.title);
    console.log("e.target.classList", e.target.classList.value);
    if (e.target.classList.contains("add-to-watchlist")) {
       // console.log("card title", e.target.parentNode.getElementsByClassName('card-title')[0].innerHTML);

        let pushMovieObj = {};
    
            pushMovieObj.id = e.target.parentNode.parentNode.id;
			pushMovieObj.title = e.target.parentNode.getElementsByClassName('card-title')[0].innerHTML;
        	pushMovieObj.cast = e.target.parentNode.getElementsByClassName('card-cast')[0].innerHTML;
			pushMovieObj.release_date = e.target.parentNode.getElementsByClassName('card-date')[0].innerHTML;
			pushMovieObj.rating = 0;
			pushMovieObj.watchlist = true;
			pushMovieObj.watched = false;
            pushMovieObj.uid = "user id";
            

        console.log('pushMovieObj',pushMovieObj);
        
        dbInt.saveMovie(pushMovieObj)
        .then();
       
    }


    if (e.target.classList.contains("card-title")) {
        console.log("e.target.parentNode.parentNode.parentNode.id", e.target.parentNode.parentNode.parentNode.id);
    }

    if (e.target.classList.contains("card-img-top")) {
        console.log("e.target.parentNode.parentNode.parentNode.id", e.target.parentNode.parentNode.parentNode.id);
    }

    // domBuilder.makeMovieCards(movieArray);
});
let cardArea = document.getElementById("cardHolder");
//Watched movies function
$(".add-to-watchlist").click(function(){
    
    // $("#cardHolder").html("");
    // savedMovies.push(target.parentNode.parentNode.id);
});

        //Delete Card id="cardDltBtn"

        //Rate Watched Movie
        // $(function () {

        //     $(".rateYo").rateYo({
        //         rating: 0,
        //         fullStar: true
        //     });
        // });

    /******/

// module.exports = {makeTestVar};
