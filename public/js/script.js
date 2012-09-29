$(document).ready(function () {

  var WriteView = Backbone.View.extend({
    el: $('.container'),
    
    initialize: function () {
      _.bindAll(this);
      this.render();
    },

    render: function () {
      $(this.el).append($('#editortemplate').html());
      $('#editor').wordframe({
	width: 600,
	height: 300
      });
    }
  });

  var writeView = new WriteView();

});
