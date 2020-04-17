exports.respondWithName = (req, res) => {
  let paramsName = req.params.myName;
  res.render("index", { name: paramsName}); //don't need specify folder or .js, express.js takes care of it as long as it is in the views folder
  //sends parameter as JS object as key value pair to the view. Key has to be the same as the variable name in the view
};
