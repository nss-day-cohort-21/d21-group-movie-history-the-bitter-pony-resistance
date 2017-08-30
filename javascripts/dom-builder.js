"use strict";
// This module only cares about the data it receives. It doesn't have to know about where the data comes from.

console.log("dom-builder.js loaded");


function makeMovieCards(moviesArr) {
    //for each movie object in array, build a card

    $("#cardHolder").html("");

    for (let i = 0; i < moviesArr.length; i++) {
 
        $("#cardHolder").append(`<div class="moovie col-md-4" id="${moviesArr[i].id}">
                                    <div class="card">
                                        <a href="#" class="movie-details"><img class="card-img-top" src="${moviesArr[i].posterURL}" alt="Card image cap">
                                        <h4 class="card-title">${moviesArr[i].title}</h4></a>
                                        <p class="card-date">${moviesArr[i].release_date}</p>
                                        <p class ="card-cast">${moviesArr[i].cast}</p>
                                        <a href="#" class="breadcrumb hidden card-link">Remove From Watchlist</a>
                                        <a href="#" class="add-to-watchlist breadcrumb card-link">Add To Watchlist</a>
                                        <a class="rateYo card-link hidden breadcrumb" style="margin:auto"></a>
                                    </div>
                                </div>`
        );
  }
}


module.exports = {makeMovieCards};
