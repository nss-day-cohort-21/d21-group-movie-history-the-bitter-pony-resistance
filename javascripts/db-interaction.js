"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let firebase = require("./firebaseConfig");


function getMovies(user) {
    return new Promise((resolve, reject) => {
        console.log('"url', firebase.getFBsettings().databaseURL);
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies.json?orderBy="uid"&equalTo="${user}"`
        }).done((movieData) => {
            console.log('musicData inside of promise', movieData);
            resolve(movieData);
        }).fail((error) => {
            reject(error);
        });

    });
}

function getLast(id) {
    
}

function saveMovie() {

}

function getSavedMovies(uid) {

}


function deleteMovie(deleteId) {

}

function watchedMovie(editId) {

}

function rateMovie(editId) {

}



module.exports = {
    getMovies,
    getLast,
    saveMovie,
    getSavedMovies,
    deleteMovie,
    watchedMovie,
    rateMovie
};
