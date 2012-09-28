(function ($) {

  var data = $.lyvewrite.data,

  edit = function (e) {
    data.$textarea
      .attr('contentEditable', true)
      .addClass(data.textareaClassName)
      .focus();
    
    $.lyvewrite.replaceButton('edit', 'view', viewButton);
    $.lyvewrite.rebuildMenu(data);
  },
  
  view = function (e) {
    data.$textarea
      .attr('contentEditable', false)
      .removeClass();
    $.lyvewrite.replaceButton('view', 'edit', editButton);
    $.lyvewrite.rebuildMenu(data);
  },

  viewButton = {
    html: 'view',
    selector: '[button-type=view]',
    events: { 'click': view }
  },

  editButton = {
    html: 'edit',
    selector: '[button-type=edit]',
    events: { 'click' : edit }
  };

  $.lyvewrite.addButton('view', viewButton);

}(jQuery));
