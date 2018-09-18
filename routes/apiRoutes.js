var db = require("../models");


module.exports = function (app) {
    app.post("/api", function(req, res) {
        res.json(["Hello"])
    });
}