
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , cat = require('./routes/cat')
  , Cat = require('./models/cat')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/cats/new', cat.newcat);
app.get('/cats', cat.cats);
app.get('/cats/color/:color', cat.color);
app.get('/cats/delete/old', cat.delete_old);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
