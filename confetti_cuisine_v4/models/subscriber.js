const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip Code too short"],
      max: 99999
    },

    courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
  });


//Instance methods
  subscriberSchema.methods.getInfo = function() { //this binding would be removed with arrow function
    return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
  };

//returns all subscribers that have the same zipCode as the subscriber instance the method is called on
  subscriberSchema.methods.findLocalSubscribers = function() {
    return this.model("Subscriber")
              .find({zipCode: this.zipCode})
              .exec();
  };


  module.exports = mongoose.model("Subscriber", subscriberSchema); //Exports the model
