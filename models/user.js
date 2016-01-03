var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  passdword: String,
  plans: [{ type: String, ref: 'Plan' }],
  rank: String
});

module.exports = mongoose.model('User', userSchema);