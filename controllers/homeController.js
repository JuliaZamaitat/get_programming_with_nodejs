exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.sendPostRequest = (req,res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
};

exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  console.log(req.query);
  next();
};
