"use strict";
const express = require("express"),
app = express(),
errorController = require("./controllers/errorController"),
homeController = require("./controllers/homeController"),
layouts = require("express-ejs-layouts"),
mongoose = require("mongoose"),
subscribersController = require("./controllers/subscribersController");

mongoose.connect( //Sets up connection to our database
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);

const db = mongoose.connection; //Assign the database to the db variable

db.once("open", () => { //Log a message when the application connects to the database
  console.log("Successfully connected to MongoDB using Mongoose!");
});



// Subscriber.create( //create is like new & save
//   {
//     name: "Julia Zamaitat",
//     email: "j@z.com"
//   },
//   function(error, savedDocument) {
//     if (error) console.log(error);
//     // console.log(savedDocument);
//   }
// );
//
// var myQuery = Subscriber.findOne({
//   name: "Julia Zamaitat"
//   })
//   .where("email", /z/);
// myQuery.exec((error, data) => {
//   if (data) console.log(data.name);
// });


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
  console.log(req.data);
  res.send(req.data);
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
  });
