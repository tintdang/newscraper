var db = require("../models");


module.exports = function (app) {
    app.post("/api", function(req, res) {
        res.json(["Hello"])
    });
}

//If saving, set the saved status to true


//If clearing, clear all nonsaved articles
//remove where saved = false

//if deleting from saved list. just remove the entry completely
// remove where we find the html link