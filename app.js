require("dotenv").config();

var port = process.env.PORT || 3001;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var learnRouter = require("./routes/learn");
var privacyPolicyRouter = require("./routes/privacy-policy");
var termsAndConditionsOfUseRouter = require("./routes/terms-and-conditions-of-use");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/learn", learnRouter);
app.use("/policy", privacyPolicyRouter);
app.use("/terms-of-use", termsAndConditionsOfUseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
