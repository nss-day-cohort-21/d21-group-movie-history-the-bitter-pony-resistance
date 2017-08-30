"use strict";

// require("./api-interaction");

var callAPI = require("./api-interaction");
let domBuilder = require("./dom-builder.js");
let testvariable = ["testing this NOW", "and again"];

let apiMovieArray = [];

function submitAPISearch(searchString) {
	apiMovieArray = [];
	
	callAPI.searchMoviesAPI(searchString)
	.then((searchResults) => {

		$.each(searchResults.results, (movie, value) => {
			buildMovieObj(movie, value);
		});
		return apiMovieArray;
	});
}


function buildMovieObj(movie, value){
	callAPI.getCastAPI(value.id)
		.then((castNames)=>{
			let movieObject = {};
			movieObject.id = value.id;
			movieObject.title = value.original_title;

			if(value.poster_path) {
			movieObject.posterURL = "https://image.tmdb.org/t/p/w185" + value.poster_path;
			} else {
			movieObject.posterURL = "img/falloutvaultboythumbsup.jpg";
			}
			movieObject.cast = castNames;
			movieObject.release_date = value.release_date.slice(0, 4);
			movieObject.rating = 0;
			movieObject.watchlist = false;
			movieObject.watched = false;
			movieObject.uid = "no id assigned yet";
			apiMovieArray.push(movieObject);
		//	console.log('apiMovieArray',apiMovieArray);
			
			domBuilder.makeMovieCards(apiMovieArray);
			
			$(function () {

					$(".rateYo").rateYo({
							rating: 0,
							maxValue: 10,
							numStars: 10,
							fullStar: true,
							starWidth: "15px"
					}).on('rateyo.set', function (e, data) { 
							console.log("Rating set to " + data.rating + "!");
					});
			});
				
			return apiMovieArray;
		});
}


module.exports = {submitAPISearch, apiMovieArray, testvariable};
