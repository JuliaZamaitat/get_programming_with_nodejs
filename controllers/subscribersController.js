const mongoose = require("mongoose"),
  Subscriber = require("../models/subscriber");

// exports.getAllSubscribers = (req, res, next) => { //Export getAllSubscribers to pass data from the database to the next middleware function
//   Subscriber.find({}, (error, subscribers)=> {
//     if (error) next(error); //Pass an error to the next middleware function
//     req.data = subscribers; //Set data that comes back from MongoDB on request object
//     next(); //Continue to the next middleware function
//   });
// };

exports.getAllSubscribers = (req, res) => { //Rewrites the getAllSubscribers function to use promises
  Subscriber.find({})
    .exec() //returns a promise from the find query
    .then((subscribers) => { //sends saved data to the next then code block
      res.render("subscribers", {
        subscribers: subscribers
      });//serves results from the database
    })
    .catch((error) => { //catch errors that are rejected in the promise
      console.log(error.message);
      return [];
    })
    .then(() => { //end the promise chain with a log message
      console.log("promise complete");
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
  newSubscriber.save()
    .then(result => {
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
