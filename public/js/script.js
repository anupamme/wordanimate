$(document).ready(function () {
  
  var Post = Backbone.Model.extend({
    idAttribute: '_id'
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
      var title = $('#title').val();
      var content = $('#editor').wordframe('getContents');
      this.model.save({
	'title': title, 
	'content': content
      });
    }
  });

  var PostView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#posttemplate').html()),

    initialize: function () {
      _.bindAll(this);
    },

    render: function () {
      $(this.el).html(this.template({
	title: this.model.get('title'),
	content: this.model.get('content')
      }));
      return this;
    }
  });

  var BlogView = Backbone.View.extend({

    template: _.template($('#blogtemplate').html()),
    
    initialize: function () {
      _.bindAll(this);
      this.render();
    },

    render: function () {
      var self = this;
      $(this.el).append(this.template());
      _.each(this.collection.models, function (post, idx, list) {
	var postView = new PostView({ model: post});
	$(self.el).append(postView.render().el);
      }, this);
    }
  });

  var WordAnimateView = Backbone.View.extend({
    el: $('.container'),
    
    template: _.template($('#wordanimatetemplate').html()),

    events: {
      'click a#view': 'renderBlogView',
      'click a#compose': 'renderWriteView'
    },
    
    initialize: function () {
      _.bindAll(this);
      this.collection = new Blog();
      this.collection.fetch();
      this.collection.on('reset', this.renderBlogView);
    },

    renderBase: function () {
      $(this.el).append(this.template());
    },

    renderBlogView: function () {
      $(this.el).empty();
      this.renderBase();
      var blogView = new BlogView({
	el: this.el,
	collection: this.collection
      });
    },

    renderWriteView: function () {
      $(this.el).empty();
      this.renderBase();
      var writeView = new WriteView({
	el: this.el,
	collection: this.collection
      });
    }
  });

  var wordAnimateView = new WordAnimateView();

});
