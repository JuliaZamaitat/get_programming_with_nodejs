const port = 3000,
  express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController");

app.set("port", process.env.PORT || 3000);//sets port to enviromental port or localhost on 3000
app.set("view engine", "ejs"); //informs about templating, sets view enging as ejs


app.get("/name/:myName", homeController.respondWithName);
app.use(layouts);
app.use(express.static("public")); //Tells the app to use the corresponding public folder to serve static files

//Error handling, order matters here! Has to go behind normal routes
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);


app.listen(app.get("port"), () => {
  console.log(`Is listening on port: ${ app.get("port")}`);
});
