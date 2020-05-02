const mongoose = require("mongoose"),
  Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res, next) => { //Export getAllSubscribers to pass data from the database to the next middleware function
  Subscriber.find({}, (error, subscribers)=> {
    if (error) next(error); //Pass an error to the next middleware function
    req.data = subscribers; //Set data that comes back from MongoDB on request object
    next(); //Continue to the next middleware function
  });
};

exports.renderContactPage = (req, res) => {
  res.render("contact");
}

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber.save((error, result) => {
    if (error) res.send(error);
    res.render("thanks");
  });
};
