(function ($, window, document) {
  'use strict';

  var getSelectionText = function () {
    var text = "";
    if (document.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type == "Text") {
      text = document.selection.createRange().text;
    }
    return text;
  },

  selectTest = function() {
    if (getSelectionText().length === 0) {
      alert('Please select some text first');
      return false;
    } else { return true; }
  },
  
  exec = function (command, arg) {
    document.execCommand(command, false, typeof arg !== undefined ? arg : null);
  },

  query = function (command) {
    return document.queryCommandValue(command);
  },

  bold = function (e) {
    e.preventDefault();
    exec('bold');
    e.data.$textarea.focus();
  },
  
  italic = function (e) {
    e.preventDefault();
    exec('italic');
    e.data.$textarea.focus();
  },
  
  list = function (e) {
    e.preventDefault();
    exec('insertUnorderedList');
    e.data.$textarea.focus();
  },

  link = function (e) {
    e.preventDefault();
    if (selectTest()) {
      exec('unlink');
      var href = prompt('Enter a link:', 'http://');
      exec('createLink', href);
    } else { return; }
    e.data.$textarea.focus();
  },
  
  large = function (e) {
    e.preventDefault();
    if (query('formatBlock') === 'h2') {
      exec('formatBlock', 'p');
    } else { exec('formatBlock', 'h2'); }
    e.data.$textarea.focus();
  },
  
  medium = function (e) {
    e.preventDefault();
    if (query('formatBlock') === 'h3') {
      exec('formatBlock', 'p');
    } else { exec('formatBlock', 'h3'); }
    e.data.$textarea.focus();
  },
    
  //the functions below are coupled to the structure of the data object

  buildMenu = function (data) {

    var buttonNames = data.buttonNames,
    buttons = data.buttons,
    className = data.menuClassName,
    menuId = data.menuId,
    areaId = data.textareaId;

    var addButton = function (name, $parent, buttons) {
      var $button = $("<a href='#' " 
		      + buttons[name].selector 
		      + ">" 
		      + buttons[name].html
		      + "</a>");
      $parent.append($button);
      return $button;
    };

    var delegateEvents = function (name, $button, events) {

      for (var e in events) {
	$button.on(e, data, events[e]);
      }
    };

    var $menu = $("<div id=" + menuId + "/>").addClass(className);
  
    if (buttonNames instanceof Array) {
      buttonNames.forEach(function (name, idx, array) {
	var $button = addButton(name, $menu, buttons);
	delegateEvents(name, $button, buttons[name].events);
      }, null);
    } else {
      $.error('incorrect argument passed to function addMenu');
    }

    return $menu;
  },

  buildTextarea = function (data) {
    
    var className = data.textareaClassName,
    id = data.textareaId,
    width = data.width,
    height = data.height;

    var $textarea = $("<div id="+ id + "/>")
      .attr('contentEditable', true)
      .addClass(className)
      .css({
	'width': width,
	'height': height
      });
    
    return $textarea;
  },  
  
  data = {

    $el: null,
    $menu: null,
    $textarea: null,
    
    width: 400,
    height: 400,
        
    textareaClassName: 'area',
    textareaId: 'lwtextarea',

    menuClassName: 'lyvewrite',
    menuId: 'lwmenu',

    buttonNames: ['bold', 'italic', 'list', 'link', 'large', 'medium'], 
    buttons: {

      'bold': {
	html: 'bold',
	selector: '[button-type=bold]',
	events: { 'click': bold }
      },
      'italic':{
	html: 'italic',
	selector: '[button-type=italic]',
	events: { 'click': italic }
      },
      'list': {
	html: 'list',
	selector: '[button-type=list]',
	events: { 'click': list }
      },
      'link': {
	html: 'link',
	selector: '[button-type=link]',
	events: { 'click': link }
      },
      'large': {
	html: 'large',
	selector: '[button-type=large]',
	events: { 'click': large }
      },
      'medium': {
	html: 'medium',
	selector: '[button-type=medium]',
	events: { 'click': medium }
      }
    }
  },

  //The functions below mutate the data object

  createEditor = function ($el, data) {
    data.$el = $el;
    data.$menu = buildMenu(data); 
    data.$textarea = buildTextarea(data);

    $el.prepend(data.$menu);
    $el.append(data.$textarea);
    return $el;
  },

  rebuildMenu = function (data) {
    data.$menu.remove();
    data.$menu = buildMenu(data);
    data.$el.prepend(data.$menu);
    return true;
  },

  addButton = function (name, button, index) {
    var idx = index || data.buttonNames.length;
    data.buttonNames.splice(idx, 0, name);
    data.buttons[name] = button;
  },

  removeButton = function (name) {
    var idx = data.buttonNames.indexOf(name);
    data.buttonNames.splice(idx, 1);
    delete data.buttons[name];
  },

  replaceButton = function (oldName, newName, newButton) {
    var idx = data.buttonNames.indexOf(oldName);
    removeButton(oldName);
    addButton(newName, newButton, idx);
  };

  $.fn.lyvewrite = function (options) {

    data = $.extend(data, options || {});
    
    return this.each(function (idx, el) {
      createEditor($(el), data);
    });
  };

  //Exports for global access by plugins

  $.lyvewrite = {
    'data': data,
    'rebuildMenu': rebuildMenu,
    'addButton': addButton,
    'removeButton': removeButton,
    'replaceButton': replaceButton
  };
  
}(jQuery, window, document));
