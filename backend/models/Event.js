const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  description: String,
  image: String,
});

EventSchema.plugin(idvalidator);
const Event = mongoose.model('Event', EventSchema);
module.exports = Event;