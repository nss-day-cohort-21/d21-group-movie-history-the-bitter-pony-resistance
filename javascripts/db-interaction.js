"use strict";
console.log("database is loaded");
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let firebase = require("./firebaseConfig");
let main = require("./main.js");
let searchAPI = require("./searchAPI.js");

console.log("searchAPI.testvariable", searchAPI.testvariable);


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

function saveMovie(id) {
//This code will add the user's movie to firebase
  // let rootRef = firebase.database().ref().child('movies');
  // console.log("this is rootRef",rootRef);
  // console.log("this is the id that was clicked", id);
  // rootRef.push({
  //   movies: id
  // });
  return new Promise((resolve, reject) =>{
    $.ajax({
      url: `${firebase.getFBsettings().databaseURL}/movies.json`,
      type: 'POST',
      data: JSON.stringify(id),
      dataType: 'json'
    }).done((id) => {
      resolve(id);
    });
  });
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
