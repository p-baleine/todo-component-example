
/**
 * Module dependencies.
 */

var express = require('express')
  , Resource = require('express-resource');

var app = express();

// middleware

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/build'));

// configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// routes

app.get('/', function(req, res) {
  res.render('index');
});

// resources

app.resource('items', require('./resources/items'));

app.listen(3000, function() {
  console.log('listening on :3000');
});