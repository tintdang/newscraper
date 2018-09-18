module.exports = function(app) {
    app.get("/", function (req, res) {
        res.render("index", {
            title: "Home"
        });
    });
    
    app.get("/saved", function(req, res) {
        res.render("saved", {
            title: "Saved Articles"
        });
    });
}