
var express = require('express'),
routes = require('./routes'),
http = require('http'),
path = require('path'),
mongoose = require('mongoose');

var app = express();

var Post = mongoose.model('Post', new Schema({
  title: String,
  content: String
}));

mongoose.connect('mongodb://localhost/activewrite');

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

app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

app.get('/api/posts', function (req, res) {
  
});

app.post('/api/posts', function (req, res) {
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
