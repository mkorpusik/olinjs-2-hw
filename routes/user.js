
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

// creating a new cat with random age, list of colors, and name
exports.newcat = function(req, res){
  // create the cat
  var cat = new Cat({name: 'bob', color: 'brown', age: 13});
  cat.save(function (err) {
    if (err)
      return console.log("error we couldn't save the cat");

    // send it back
    res.render('newcat', { title: 'New Cat' });
  });
};
