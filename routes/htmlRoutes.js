var db = require("../models")

module.exports = function (app) {
    // Render the index.html
    app.get("/", function (req, res) {
        //get the article data
        db.Article.find({}, function (err, data) {
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                if (data.length == 0) {
                    return res.render("index", {
                        title: "Home",
                        empty: true
                    })
                }
                res.render("index", {
                    title: "Home",
                    article: data,
                    empty: false
                });
            }
        })
    });

    app.get("/saved", function (req, res) {
        db.Article.find({}, function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                if (data.length == 0) {
                    return res.render("saved", {
                        title: "Saved Articles",
                        empty: true
                    })
                }
                res.render("saved", {
                    title: "Saved Articles",
                    article: data,
                    empty: false
                });
            }
        });
    });
}