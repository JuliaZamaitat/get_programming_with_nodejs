const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

  app.set("port", process.env.PORT || 3000);

  //--Interpret data within incoming requests, before routes--
    app.use(
      express.urlencoded({
        extended: false
      })
    );
    app.use(express.json());
    //---

  app.get("/", (req, res) => {
    res.send("Welcome to Confetti Cuisine!");
  });

  app.get("/courses", homeController.showCourses);
  app.get("/contact", homeController.showSignUp);
  app.post("/contact", homeController.postedSignUpForm);

  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });
