"use strict";

let user = require("./user.js");
let domBuilder = require("./dom-builder.js");

require("./searchAPI");

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
        

        //Find my movies click button id="searchMyMovies"

        
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
        });

        //Logout button click id="logoutBtn"
        
        $("#logoutBtn").on('click', function(){
            console.log("logout clicked");
            user.logOut();
            // loadMoviesToDOM();            
        });
        

    /******/

    /***Watched/Unwatched***/

        //Click Funtion for Watched button

        //Click Function for Unwatched button

    /******/

    /***Card Funtionality***/

        //Add to watch list 
        //If logged in push to database/else login alert

        //Delete Card id="cardDltBtn"

        //Rate Watched Movie

    /******/


