
var express = require('express'),
routes = require('./routes'),
http = require('http'),
path = require('path'),
mongoose = require('mongoose');

var app = express();

var Post = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String
}));

mongoose.connect('mongodb://localhost/wordanimate');

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
  var posts = Post.find();
  res.send(posts);
});

app.post('/api/posts', function (req, res) {
  var post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
});

app.put('/api/posts/:id', function (req, res) {
  console.log(id);
  Post.update({'id': id}, {
    'title': req.body.title,
    'content': req.body.content
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
