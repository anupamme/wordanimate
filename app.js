
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
  return Post.find(function (err, posts) {
    if (!err) {
      return res.send(posts);
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/posts/:id', function (req, res) {
  return Post.findById(req.params.id);
});

app.post('/api/posts', function (req, res) {
  console.log('post called');
  var post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  return res.send(post);
});

app.put('/api/posts/:id', function (req, res) {
  console.log('put called');
  Post.findByIdAndUpdate(req.params.id, {
    'title': req.body.title,
    'content': req.body.content
  }, function() { 
    console.log('update successful');
    return res.send();
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
