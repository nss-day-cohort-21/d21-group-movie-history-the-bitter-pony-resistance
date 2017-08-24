"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");


// Using the REST API
function loadSongsToDOM() {
  console.log("Need to load some songs, Buddy");
  let currentUser = user.getUser();
  db.getSongs(currentUser)
  .then((songData) => {
    console.log("got data", songData);
    let idArray = Object.keys(songData);
    idArray.forEach((key) => {
      songData[key].id = key;
    });
    console.log("After idArray", songData);
    templates.makeSongList(songData);
  });
}

// loadSongsToDOM(); //<--Move to auth section after adding login btn

// Send newSong data to db then reload DOM with updated song data
$(document).on("click", ".save_new_btn", function() {
  console.log("clicked on save new song");
  let songObj = buildSongObj();
  db.addSong(songObj)
  .then((songID) => {
    loadSongsToDOM();
  });
});

// go get the song from database and then populate the form for editing.
$(document).on("click", ".edit-btn", function () {
  console.log("clicked edit button", $(this).data("edit-id"));
  let songID = $(this).data("edit-id");
  db.getSong(songID)
  .then((song) => {
    return templates.songForm(song, songID);
  })
  .then((finishedForm) => {
    $(".uiContainer--wrapper").html(finishedForm);
  });
});

//Save edited song to FB then reload DOM with updated song data
$(document).on("click", ".save_edit_btn", function() {
  let songObj = buildSongObj();
  let songID = $(this).attr("id");
  console.log("songID", songID);

  db.editSong(songObj, songID)
  .then((data) => {
    loadSongsToDOM();
  });
});

// Remove song then reload the DOM w/out new song
$(document).on("click", ".delete-btn", function () {
    console.log("clicked delete button", $(this).data("delete-id"));
    let songID = $(this).data("delete-id");
    db.deleteSong(songID)
    .then(() => {
      loadSongsToDOM();
    });

});


// Helper functions for forms stuff. Nothing related to Firebase
// Build a song obj from form data.
function buildSongObj() {
    let songObj = {
    title: $("#form--title").val(),
    artist: $("#form--artist").val(),
    album: $("#form--album").val(),
    year: $("#form--year").val(),
    uid: user.getUser()
  };
  return songObj;
}

// Load the new song form
$("#add-song").click(function() {
  console.log("clicked add song");
  var songForm = templates.songForm()
  .then(function(songForm) {
    $(".uiContainer--wrapper").html(songForm);
  });
});


$("#auth-btn").click(function(){
  console.log("clicked on Signin");
  user.logInGoogle()
  .then((result) => {
    console.log("result from login", result.user.uid);
    user.setUser(result.user.uid);
    $("#auth-btn").addClass("is-hidden");
    $("#logout").removeClass("is-hidden");
    loadSongsToDOM();
  });
});

$("#logout").click(function(){
  console.log("logout clicked");
  user.logOut();
});