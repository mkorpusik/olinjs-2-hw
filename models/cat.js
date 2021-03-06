var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var userSchema = mongoose.Schema({
  name: String,
  color: [String],
  age: Number
});

var Cat = mongoose.model('Cat', userSchema);

module.exports = Cat;
