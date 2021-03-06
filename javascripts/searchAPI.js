"use strict";

// require("./api-interaction");

var callAPI = require("./api-interaction");
let domBuilder = require("./dom-builder.js");
let testvariable = ["testing this NOW", "and again"];

let apiMovieArray = [];
// console.log("something is working!");
// let searchString = "lord%20of%20the";
function submitAPISearch(searchString) {
	// searchString = "star%20wars";

	// console.log("searchString", searchString);
	// let searchResults = callAPI.searchMoviesAPI(searchString);
	// console.log("searchResults", searchResults);

	// module.exports = callAPI;
	// console.log("callAPI", callAPI);

	apiMovieArray = [];
	

	callAPI.searchMoviesAPI(searchString)
	.then((searchResults) => {
		// console.log("searchResults", searchResults);
		// console.log("searchResults.results", searchResults.results);

		$.each(searchResults.results, (key, value) => {
			let movieObject = {};
			movieObject.id = value.id;
			movieObject.title = value.original_title;

			if(value.poster_path) {
			movieObject.posterURL = "https://image.tmdb.org/t/p/w185" + value.poster_path;
			} else {
			movieObject.posterURL = "img/falloutvaultboythumbsup.jpg";
			}

			movieObject.overview = value.overview;
			movieObject.release_date = value.release_date.slice(0, 4);
			apiMovieArray.push(movieObject);
		});

		// console.log("apiMovieArray", apiMovieArray);
		return apiMovieArray;

	})
	.then((apiMovieArray) => {

		// $("#container").html("");

		console.log("apiMovieArray", apiMovieArray);

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

	// var promises = [];
	// for (var i in apiMovieArray) {
	// 	promises.push(callAPI.getCastAPI(apiMovieArray[i].id));
	// }

	// // Promise.all(promises.map((promise) => promise.catch((error) => error)))
	// Promise.all(promises)
	// .then((creditsArray) => {


	// 	// console.log("creditsArray", creditsArray);

	// 	let castNames = [];

	// 	$.each(creditsArray, (creditsKey, creditsValue) => {

	// 		let numberCast;
	// 		let eachMovieNames = [];

	// 		// console.log("creditsValue.cast", creditsValue.cast);

	// 		if (creditsValue.cast.length <= 5) {
	// 			numberCast = (creditsValue.cast.length);
	// 		} else {
	// 			numberCast = 5;
	// 		}

	// 		for(var k = 0; k < numberCast; k++) {
				
	// 			// console.log("creditsValue.cast[k]", creditsValue.cast[k]);
	// 			// console.log("creditsValue.cast[k].name", creditsValue.cast[k].name);
	// 			eachMovieNames.push(creditsValue.cast[k].name);
	// 		}

	// 		castNames.push(eachMovieNames);
	// 	});

	// 	// console.log("castNames at end of loop", castNames);

	// 	for (var k in apiMovieArray) {
	// 		apiMovieArray[k].cast = castNames[k];
	// 	}


	// 	// console.log("apiMovieArray after addition of cast names:", apiMovieArray);

	// 	domBuilder.makeMovieCards(apiMovieArray);

	// })
	// .catch((error) => console.log(error));


	});
	// .then((apiMovieArray) => {

	// 	console.log("apiMovieArray right before dom print", apiMovieArray);
	// // domBuilder.makeMovieCards(searchAPI.submitAPISearch(input)))


	
}

module.exports = {submitAPISearch, apiMovieArray, testvariable};