$(document).ready(function () {
  
  var Post = Backbone.Model.extend({
    defaults: {
      title: "Post title",
      content: "some words"
    }
  });

  var Blog = Backbone.Collection.extend({
    model: Post,
    url: '/api/posts'
  });

  var WriteView = Backbone.View.extend({

    template: _.template($('#editortemplate').html()),

    events: {
      'click button#save': 'savePost'
    },
    
    initialize: function () {
      _.bindAll(this);
      this.model = new Post();
      this.collection.add(this.model);
      this.render();
    },

    render: function () {
      $(this.el).append(this.template());
      $('#editor').wordframe({
	width: 600,
	height: 300
      });
    },

    savePost: function () {
      console.log(this.model.url());
      var title = $('#title').val();
      var content = $('#editor').wordframe('getContents');
      this.model.save({
	'title': title, 
	'content': content
      });
      if (this.model.isNew()) {
	this.model.id = this.collection.length + 1;
      }
    }
  });

  var PostView = Backbone.View.extend({});

  var BlogView = Backbone.View.extend({});

  var WordAnimateView = Backbone.View.extend({
    el: $('.container'),
    
    template: _.template($('#wordanimatetemplate').html()),
    
    initialize: function () {
      _.bindAll(this);
      this.collection = new Blog();
      this.collection.fetch();
      this.render();
    },

    render: function () {
      $(this.el).append(this.template());
      var writeView = new WriteView({
	el: this.el,
	collection: this.collection
      });
    }
  });

  var wordAnimateView = new WordAnimateView();

});
