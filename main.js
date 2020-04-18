const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");

  app.set("port", process.env.PORT || 3000);

  app.use(express.static("pulic")); //In order to use static files

//to use ejs rendering template
  app.set("view engine", "ejs");
  app.use(layouts);

  //--Interpret data within incoming requests, before routes--
    app.use(
      express.urlencoded({
        extended: false
      })
    );
    app.use(express.json());
    //---

  app.get("/", homeController.renderIndexPage);
  app.get("/courses", homeController.showCourses);
  app.get("/contact", homeController.showSignUp);
  app.post("/contact", homeController.postedSignUpForm);

  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });
