"use strict";

let user = require("./user.js");
let domBuilder = require("./dom-builder.js");
let searchAPI = require("./searchAPI");

let testArray = [
          {"cast": ["Nicholas Cage", "Tom Cruise", "Matt Damon", "Jessica Biel", "Andre 3000" ],
          "title": "Worst Movie Ever",
          "id": "12345",
          "img": "img/falloutvaultboythumbsup.jpg",
          "releaseDate": "1901"
            },
          {"cast": ["Jim Brown", "Tico Tico", "Elvis Presley", "Johnny Depp", "Jim Carey" ],
          "title": "Best Movie Ever",
          "id": "54321",
          "img": "img/falloutvaultboythumbsup.jpg",
          "releaseDate": "2001"
          }
];

searchAPI.submitAPISearch("star%20wars");

domBuilder.makeMovieCards(testArray);

/***** Event Listeners *****/

    /***NavBar***/

        //Find movies enter keyboard function id=""
        let inputAreaFunc = $('#searchInput').keypress(function(event){
            if (event.which == 13) {
                var input = $("#searchInput").val();
                console.log("Search Input", input);
            }
        });

        //Find movies click button id="findMovie"
        $("#findMovie").click(function(){
            console.log("clicked on Find Movie");
        });

        //Find my movies click button id="searchMyMovies"
        $("#searchMyMovies").click(function(){
            console.log("clicked on Search My Movies");
        });
        
        //Login button click id="loginBtn"
        $("#loginBtn").click(function(){
            console.log("clicked on Signin");
            user.logInGoogle()
            .then((result) => {
                console.log("result from login", result.user.uid);
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
            console.log("logout clicked");
            user.logOut();
            // loadMoviesToDOM();  
            $("#logoutBtn").attr('disabled', true);
            $("#loginBtn").attr('disabled', false);          
        });
        

    /******/

    /***Watched/Unwatched***/

        //Click Funtion for Watched button
        $("#watched").click(function(){
            console.log("clicked on Watched toggle button");
            $('.breadcrumb').toggleClass('unwatched');
            $("#watched").attr('disabled', true);
            $("#unwatched").attr('disabled', false);
            
        });

        //Click Function for Unwatched button
        $("#unwatched").click(function(){
            console.log("clicked on Unwatched toggle button");
            $('.breadcrumb').toggleClass('unwatched');
            $("#unwatched").attr('disabled', true);
            $("#watched").attr('disabled', false);
        });
        
    /******/

    /***Card Funtionality***/

        //Add to watch list 
        //If logged in push to database/else login alert

        //Delete Card id="cardDltBtn"

        //Rate Watched Movie
        $(function () {
 
            $(".rateYo").rateYo({
                rating: 0,
                numStars: 10,
                fullStar: true
            });
        });

    /******/


                    
                    