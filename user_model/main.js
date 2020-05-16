"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  router = express.Router();

  mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true}
  );


app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use("/", router);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);


router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/courses", coursesController.index, coursesController.indexView);

router.post("/subscribe", subscribersController.saveSubscriber);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.get("/users/:id", usersController.show, usersController.showView);
router.post("/users/create", usersController.create, usersController.redirectView);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
