var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");


module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        console.log("Hitting scrape route")
        request("https://news.utexas.edu/", function (error, response, html) {
            console.log("running request route")
            if (error) {
                console.log(error)
                return res.json(error)
            }
            var $ = cheerio.load(html);
            console.log("passed error check")
            // Grab everything that we need for our object and place it into the results object which will place into creating our model
            $("h2.news-headline").each(function (i, element) {
                var result = {};
                // add the headline, summary, and href
                result.headline = $(element)
                    .children("a")
                    .text();
                result.summary = $(element)
                    .siblings("div.body-copy")
                    .children("p")
                    .text();
                result.url = $(element)
                    .children("a")
                    .attr("href");
                console.log("results: " + JSON.stringify(result))

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle)
                    })
                    .catch(function (err) {
                        return res.json(err)
                    });
                });
                
            });
            //refresh the site
            res.redirect("/")
    });
}

//If saving, set the saved status to true


//If clearing, clear all nonsaved articles
//remove where saved = false

//if deleting from saved list. just remove the entry completely
// remove where we find the html link