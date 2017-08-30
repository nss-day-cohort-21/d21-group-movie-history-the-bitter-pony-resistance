"use strict";

let user = require("./user.js");
let domBuilder = require("./dom-builder.js");
let searchAPI = require("./searchAPI");
let dbInt = require("./db-interaction.js");

 user.logOut();

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

       

//Login button click id="loginBtn"
$("#loginBtn").click(function(){
    // console.log("clicked on Signin");
    user.logOut();
    user.logInGoogle()
    .then((result) => {
        //console.log("result from login", result.user.uid);
        user.setUser(result.user.uid);
        $("auth-btn").addClass("is-hidden");
        $("#logout").removeClass("is-hidden");
        // loadMoviesToDOM();
        let currentUser = user.getUser();
        dbInt.getSavedMovies(currentUser)
        .then((movieData)=>{
            console.log('currentUser', currentUser);
            
            console.log('MOVIES SHOULD LOAD');
            console.log('movieData', movieData);
            
            domBuilder.makeMovieCards(movieData);
        });
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



$(".watched-button").click(function(){
    console.log("button is clicked");
    sliderArea.innerHTML = "";
    cardArea.innerHTML = "";
    sliderArea.innerHTML += `<input type="range" min="0" max="10">`;
    $("div").removeClass("hidden");
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
       let currentUser = user.getUser();
        if(currentUser === null){
            window.alert("Please Sign Up to Add Movies To Watch List");
        } else {
            let pushMovieObj = {};
        
                pushMovieObj.id = e.target.parentNode.parentNode.id;
                pushMovieObj.title = e.target.parentNode.getElementsByClassName('card-title')[0].innerHTML;
                pushMovieObj.cast = e.target.parentNode.getElementsByClassName('card-cast')[0].innerHTML;
                pushMovieObj.release_date = e.target.parentNode.getElementsByClassName('card-date')[0].innerHTML;
                pushMovieObj.rating = 0;
                pushMovieObj.watchlist = true;
                pushMovieObj.watched = false;
                pushMovieObj.uid = user.getUser();
                
            console.log('pushMovieObj',pushMovieObj);
            
            dbInt.saveMovie(pushMovieObj)
            .then();
        }
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
    
   
});
