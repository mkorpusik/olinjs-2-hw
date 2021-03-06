
/*
 * Sources used: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array, http://www.javascriptkit.com/javatutors/randomnum.shtml, http://stackoverflow.com/questions/1996747/add-new-value-to-an-existing-array-in-javascript, http://www.w3schools.com/js/js_loop_for.asp, http://stackoverflow.com/questions/1181575/javascript-determine-whether-an-array-contains-a-value, http://stackoverflow.com/questions/5679296/mongodb-mongoose-sort-error

 * GET cats listing.
 */

// helper function to check if an array contains the given element
function contains(array, element) {
  for (var i in array) {
	if (array[i]==element)
	  return true;
  }
  return false;
}

// routes for cats
var Cat = require('../models/cat')

// creating a new cat with random age, list of colors, and name
exports.newcat = function(req, res){

  // get random age from 1 to 20
  var age=Math.floor(Math.random()*21);

  // get random colors
  var colors=['red', 'orange', 'yellow', 'gray', 'black','brown', 'white'];
  var num_colors = Math.floor(Math.random() * colors.length) + 1;
  var color = new Array();
  for (var i=0;i<num_colors;i++)
  {
    rand_color = colors[Math.floor(Math.random() * colors.length)];

    // check if rand_color is already in the color array
    var already_has_color = contains(color, rand_color);
    if (!already_has_color)
      color.push(rand_color);
  }
  

  // get random name
  var names=['tim', 'bob', 'hershey', 'daisy', 'star', 'buttons', 'kitty'];
  var name = names[Math.floor(Math.random() * names.length)];

  // create the cat 
  var cat = new Cat({name: name, color: color, age: age});
  cat.save(function (err) {
    if (err)
      return console.log("error we couldn't save the cat");
    // send it back
    res.render('newcat', {cat:cat, title: 'Cat List' });
  });
};


// shows a sorted list of cats by age
exports.cats = function(req, res){

  // get the list of cats
  var cats = Cat.find({}).sort('age').exec(function (err, sorted) {
    if (err)
      return console.log("error", cats);
    
    // send them back
    res.render('cats', {cats:sorted, title: 'Cat List Sorted by Age' });
  });
};

// shows a sorted list of cats by age that have a given color
exports.color = function(req, res){
  var color = req.params.color;

  // get the list of cats
  var cats = Cat.find({'color': color}).sort('age').exec(function (err, sorted) {
    if (err)
      return console.log("error", cats);
    
    // send them back
    res.render('cats', {cats:sorted, title: 'Cat List Sorted by Color' });
  });
};

// deletes the oldest cat
exports.delete_old = function(req, res){

  // get the list of cats
  var cats = Cat.find({}).sort('age').exec(function (err, sorted) {
    if (err)
      return console.log("error", cats);

    // get oldest cat (i.e. last cat on the list)
    oldest_cat = sorted[sorted.length-1]

    // remove oldest cat
    Cat.remove({'_id': oldest_cat._id}, function (err) {
      if (err) return handleError(err);
    });

    // send them back
    res.render('cats', {cats:sorted, title: 'Remove Oldest Cat' });
  });
};



