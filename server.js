var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// import the database
var mongoose = require('mongoose')

// initialize express
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// If deployed, use deployed database. Otherwise use the local newscraper database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newscraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`)
})