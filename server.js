const app = require('express')();
const express = require('express');
const bodyParser = require("body-parser");
const passport = require("passport");
const { localStrategy, JwtStrategy } = require("./helper/passport");
const { handleNotFound } = require("./middlewear/error");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept,Authorization"
  );
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.options("*", function (req, res) {
  res.sendStatus(200);
});
app.use(passport.initialize());
passport.use("login", localStrategy);
passport.use("jwt", JwtStrategy);

require("./routes/index")(app);
app.use('/uploads', express.static('uploads'))
app.use(handleNotFound);

module.exports = app;