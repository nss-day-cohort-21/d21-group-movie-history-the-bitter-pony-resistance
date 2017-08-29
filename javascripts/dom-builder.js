"use strict";
// This module only cares about the data it receives. It doesn't have to know about where the data comes from.

console.log("dom-builder.js loaded");


function makeMovieCards(moviesArr) {
    //for each movie object in array, build a card

  $("#cardHolder").html("");

  for (let i = 0; i < moviesArr.length; i++) {
    // convert cast array of each movie into a string w/ commas and spaces (unless last cast member in array)

    // let thisCastArr = moviesArr[i].cast;      <------------ this code printed cast info to dom cards
    // let thisCast = "";
    // console.log("thisCastArr", thisCastArr);
    
    // for (let j = 0; j < thisCastArr.length; j++) {
    //     // console.log("thisCastArr", thisCastArr);
    //     if (j < (thisCastArr.length - 1)) {
    //         // console.log("if was true");
    //     thisCast += thisCastArr[j] + ", ";
    //     } else {
    //         thisCast += thisCastArr[j];
    //     }
    //     // console.log("thisCast", thisCast);

    // }
    // console.log("thisCast", thisCast);

    // $("#cardHolder").append("TEST THIS");
    

    $("#cardHolder").append(`<div class="moovie col-md-4" id="${moviesArr[i].id}">
                                  <div class="card">
                                      <a href="#" class="movie-details"><img class="card-img-top" src="${moviesArr[i].posterURL}" alt="Card image cap">
                                      <h4 class="card-title">${moviesArr[i].title}</h4></a>
                                      <p class="card-text">${moviesArr[i].release_date}</p>
                                      <p class ="card-cast">${moviesArr[i].cast}</p>
                                      <a href="#" class="breadcrumb hidden card-link">Remove From Watchlist</a>
                                      <a href="#" class="add-to-watchlist breadcrumb card-link">Add To Watchlist</a>
                                      <a class="rateYo card-link breadcrumb" style="margin:auto"></a>
                                  </div>

                              </div>`



      );
  }

}


module.exports = {makeMovieCards};
