"use strict";
// This module only cares about the data it receives. It doesn't have to know about where the data comes from.

console.log("dom-builder.js loaded");


function makeMovieCards(moviesArr) {
    //for each movie object in array, build a card
  for (let i = 0; i < moviesArr.length; i++) {
    // convert cast array of each movie into a string w/ commas and spaces (unless last cast member in array)
    let thisCastArr = moviesArr[i].cast;
    let thisCast = "";
    // console.log("thisCastArr", thisCastArr);
    
    for (let j = 0; j < thisCastArr.length; j++) {
        // console.log("thisCastArr", thisCastArr);
        if (j < (thisCastArr.length - 1)) {
            // console.log("if was true");
        thisCast += thisCastArr[j] + ", ";
        } else {
            thisCast += thisCastArr[j];
        }
        // console.log("thisCast", thisCast);

    }
    console.log("thisCast", thisCast);

    // $("#cardHolder").append("TEST THIS");
    
    $("#cardHolder").append(`<div class="moovie col-sm-4">
                                  <div class="card" id="${moviesArr.id}">
                                      <img class="card-img-top" src="${moviesArr[i].img}" alt="Card image cap">
                                      <h4 class="card-title">${moviesArr[i].title}</h4>
                                      <h6 class="card-subtitle mb-2 text-muted">Staring: ${thisCast}</h6>
                                      <p class="DT card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                      <p class="card-text">${moviesArr.releaseDate}</p>
                                      <a href="#" class="breadcrumb card-link">Remove From Watchlist</a>
                                      <a class="hidden rateYo card-link breadcrumb" style="margin:auto"></a>
                                  </div>

                              </div>`
      );
  }

}


module.exports = {makeMovieCards};
