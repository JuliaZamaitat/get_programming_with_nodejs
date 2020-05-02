"use strict";



const express = require("express"),
app = express(),
errorController = require("./controllers/errorController"),
homeController = require("./controllers/homeController"),
layouts = require("express-ejs-layouts"),
MongoDB = require("mongodb").MongoClient,
dbURL = "mongodb://localhost:27017", //default port for MDB
dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => { //Sets up connection to local database server and returns the connection as callback
  if (error) throw error;
  let db = client.db(dbName); //get the db called recipe_db – if no db with this name exists, MDB creates one for us in the app
  db.collection("contacts")
  .find() //find all records in the contacts collection
  .toArray((error, data) => { //return them in an array via a callback
    if (error) throw error;
    console.log(data);
  });

  db.collection("contacts")
  .insert({
    name: "freddie",
    mail: "freddie@work.com"
  },(error, db) => {
    if (error) throw error;
    console.log(db);
  });

});



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
