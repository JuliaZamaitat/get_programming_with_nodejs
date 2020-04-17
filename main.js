const port = 3000,
  express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController");

app.set("port", process.env.PORT || 3000);//sets port to enviromental port or localhost on 3000
app.set("view engine", "ejs"); //informs about templating, sets view enging as ejs
app.use(layouts)
app.get("/name/:myName", homeController.respondWithName);


app.listen(app.get("port"), () => {
  console.log(`Is listening on port: ${ app.get("port")}`);
});
