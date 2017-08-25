"use strict";

console.log("api-interaction.js");

function searchMoviesAPI(searchString) {
	return new Promise((resolve, reject) => {
		console.log("what is the movies URL?", `https://api.themoviedb.org/3/search/movie?api_key=4542105ab96b56ba20c973e344b4ac55&language=en-US&query=${searchString}&page=1&include_adult=false`);
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=4542105ab96b56ba20c973e344b4ac55&language=en-US&query=${searchString}&page=1&include_adult=false`
		}).done((movieData) => {
			resolve(movieData);
		});
	});
}


function getCastAPI(movieId) {
	return new Promise((resolve, reject) => {
		console.log("what is the cast URL?", `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=4542105ab96b56ba20c973e344b4ac55`);
		$.ajax({
			url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=4542105ab96b56ba20c973e344b4ac55`
		}).done((creditsData) => {
			resolve(creditsData);
		});
	});
}

module.exports = {searchMoviesAPI, getCastAPI};

