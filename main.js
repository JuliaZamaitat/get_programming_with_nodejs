const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Is listening on port: ${ app.get("port")}`);
});
