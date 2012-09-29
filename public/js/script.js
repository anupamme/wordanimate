$(document).ready(function () {

  var Post = Backbone.Model.extend({
    defaults: {
      title: "Post title",
      content: "some words"
    }
  });

  var Blog = Backbone.Collection.extend({
    model: Post
  });

  var WriteView = Backbone.View.extend({
    el: $('.container'),

    template: $('#editortemplate'),

    events: {
      'click button#save': 'savePost'
    },
    
    initialize: function () {
      _.bindAll(this);
      this.model = new Post();
      this.render();
    },

    render: function () {
      $(this.el).append(this.template.html());
      $('#editor').wordframe({
	width: 600,
	height: 300
      });
    },

    savePost: function () {
      
    }
  });

  var writeView = new WriteView();

});
