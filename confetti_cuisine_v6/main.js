"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  User = require("./models/user"),
  router = require("./routes/index");

  mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true}
  );

//ALL MIDDLEWARE HAS TO BE APP.USE, because we want it to parse requests before it reaches router at the bottom of the file
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());
app.use(layouts);
app.use(express.static("public"));


app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));
app.use(cookieParser("secret_passcode")); // load the cookie-parsing middleware
app.use(expressSession({ //Configure express-session to use cookie-parser
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(connectFlash()); //as middleware


app.use(expressValidator());

//Adding Passport module as middleware within Express gives you access to the library of methods provided by Passport.js
//These methods are extended to the request as it enters the application
//As that request is passed through the middleware chain, you can call these passport methods on it anywhere you like
app.use(passport.initialize());
app.use(passport.session()); //uses expressSession, because it uses whatever session you aready set up
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => { //middleware to associate connectFlash to flashes on response
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  console.log("Logged" +res.locals.loggedIn);
  res.locals.currentUser = req.user;
  next();
});


app.use("/", router); //after all middleware functions

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
