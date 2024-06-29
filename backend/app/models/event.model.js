const mongoose = require("mongoose");

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    start: {
      type: String,
      require: true,
    },
    end: {
      type: String,
      require: false,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    allDay: {
      type: Boolean,
      require: false,
    },
    text: {
      type: String,
      require: false,
    },
    link: {
      type: String,
      require: false,
    },
    cssClass: {
      type: String,
      require: false,
    },
  })
);

module.exports = Event;
