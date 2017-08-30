"use strict";

//console.log("api-interaction.js");
let mdb = require("./mdb-getter.js"),
		k = mdb();

let ApiInteraction = {};

var config = {
							apiKey: k.apiKey,
							authDomain: k.authDomain,
							databaseURL: k.databaseURL
};

ApiInteraction.getMDBSettings = function() {
	return config;
};

//console.log('check for movie api key', ApiInteraction.getMDBSettings());

ApiInteraction.searchMoviesAPI = (searchString)=> {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=${ApiInteraction.getMDBSettings().apiKey}&language=en-US&query=${searchString}&page=1&include_adult=false`
		}).done((movieData) => {
			resolve(movieData);
		}).fail((error) => {
			reject(error);
		});
	});
};

ApiInteraction.getCastAPI = (movieId)=> {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${ApiInteraction.getMDBSettings().apiKey}`
		}).done((creditsData) => {
				let castNames = "";
				for (var i = 0; i < 5; i++) {
					castNames += `${creditsData.cast[i].name}` + ' ';
				}
			resolve(castNames);
		}).fail((error) => {
			reject(error);
		});
	});
};

module.exports = ApiInteraction;
