var express = require("express");
var bodyParser = require("body-parser");
var logger = require('morgan')
var exphbs = require("express-handlebars");

// import the database
var mongoose = require('mongoose')

// initialize express
var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// If deployed, use deployed database. Otherwise use the local newscraper database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newscraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

var db = mongoose.connection;
db.on("error", function (err) {
    console.log("-----Mongoose error: --=--" + err);
})

db.once("open", function() {
    console.log("Mongoose connected succesfully");
});

// Run handlebars
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