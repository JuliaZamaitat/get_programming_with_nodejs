exports.respondWithName = (req, res) => {
  let paramsName = req.params.myName;
  res.render("index", { name: paramsName}); //don't need specify folder or .js, express.js takes care of it as long as it is in the views folder
};
