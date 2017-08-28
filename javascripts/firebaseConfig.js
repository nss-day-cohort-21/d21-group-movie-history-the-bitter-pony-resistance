"use strict";

let firebase = require("firebase/app"),
    fb = require("./fb-getter.js"),
    fbData = fb(); // could do fbData = ("./fb-getter"), but would have to use fbData.getKey() to invoke

require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: fbData.apiKey,
  authDomain: fbData.authDomain,
  databaseURL: fbData.databaseURL
};

firebase.getFBsettings = function(){         // <- this is built into firebase app, called above
	 console.log("getFBsettings", config);
	 return config;
};

firebase.initializeApp(config);
module.exports = firebase;
