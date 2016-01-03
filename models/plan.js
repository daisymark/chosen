var mongoose = require('mongoose');

var planSchema = new mongoose.Schema({
  name: String,
  content: String
});

module.exports = mongoose.model('Plan', planSchema);