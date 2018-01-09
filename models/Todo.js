var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  item: String,
  description: String,
  toBeDoneBy: String,
  deadline: { type: Date },
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);
