const port = 3000,
  express = require("express"),
  app = express();

app.use((req, res, next) => { //This function has to come before the other routes
  console.log(`request made to: ${req.url}`);
  next();
});

app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})
