module.exports = function (app) {
    app.post("/api", function(req, res) {
        res.json(["Hello"])
    });
}