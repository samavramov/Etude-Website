var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gymnastsAPIRouter = require('./routes/gymnasts');
var loginAPIRouter = require("./routes/login");
var cors = require("cors");

// initialize the database
var db = require("./database");
db.init();

var app = express();

// Middleware to validate Google OAuth token
async function validateToken(req, res, next) {
  const token = req.headers.authorization; // Assuming token is passed in the Authorization header
  const { path } = req; // Extract the current request path
  console.log("auth token: " + token);
  // Skip validation for the /login route
  if (path === "/login") {
    return next();
  }

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    const data = await response.json();

    // Check if the token is valid
    if (data.error) {
      return res.redirect("/login");
    }

    // Token is valid, proceed to next middleware or route
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(validateToken);
app.use('/', indexRouter);
app.use("/gymnasts", gymnastsAPIRouter);
app.use("/login", loginAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
