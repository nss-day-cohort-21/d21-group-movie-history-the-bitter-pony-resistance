"use strict";

// require("./api-interaction");

var callAPI = require("./api-interaction");

// console.log("something is working!");
// let searchString = "lord%20of%20the";

let searchString = "star%20wars";

console.log("searchString", searchString);
// let searchResults = callAPI.searchMoviesAPI(searchString);
// console.log("searchResults", searchResults);

// module.exports = callAPI;
// console.log("callAPI", callAPI);

let movieArray = [];

callAPI.searchMoviesAPI(searchString)
.then((searchResults) => {
	// console.log("searchResults", searchResults);
	// console.log("searchResults.results", searchResults.results);

	$.each(searchResults.results, (key, value) => {
		let movieObject = {};
		movieObject.id = value.id;
		movieObject.title = value.original_title;
		movieObject.posterURL = "https://image.tmdb.org/t/p/w185" + value.poster_path;
		movieObject.overview = value.overview;
		movieObject.release_date = value.release_date;
		movieArray.push(movieObject);
	});

	console.log("movieArray", movieArray);
	return movieArray;

})
.then((movieArray) => {

var promises = [];
for (var i in movieArray) {
	promises.push(callAPI.getCastAPI(movieArray[i].id));
}

Promise.all(promises).then((creditsArray) => {


	// console.log("creditsArray", creditsArray);

	let castNames = [];

	$.each(creditsArray, (creditsKey, creditsValue) => {

		let numberCast;
		let eachMovieNames = [];

		// console.log("creditsValue.cast", creditsValue.cast);

		if (creditsValue.cast.length <= 5) {
			numberCast = (creditsValue.cast.length);
		} else {
			numberCast = 5;
		}

		for(var k = 0; k < numberCast; k++) {
			
			// console.log("creditsValue.cast[k]", creditsValue.cast[k]);
			// console.log("creditsValue.cast[k].name", creditsValue.cast[k].name);
			eachMovieNames.push(creditsValue.cast[k].name);
		}

		castNames.push(eachMovieNames);
	});

	console.log("castNames at end of loop", castNames);

	for (var k in movieArray) {
		movieArray[k].cast = castNames[k];
	}


	console.log("movieArray after addition of cast names:", movieArray);
});

});