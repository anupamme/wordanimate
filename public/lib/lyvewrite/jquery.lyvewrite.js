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
    $('#'+e.data.areaId).focus();
  },
  
  italic = function (e) {
    e.preventDefault();
    exec('italic');
    $('#'+e.data.areaId).focus();
  },
  
  list = function (e) {
    e.preventDefault();
    exec('insertUnorderedList');
    $('#'+e.data.areaId).focus();
  },

  link = function (e) {
    e.preventDefault();
    if (selectTest()) {
      exec('unlink');
      var href = prompt('Enter a link:', 'http://');
      exec('createLink', href);
    } else { return; }
    $('#'+e.data.areaId).focus();
  },
  
  h2 = function (e) {
    e.preventDefault();
    if (query('formatBlock') === 'h2') {
      exec('formatBlock', 'p');
    } else { exec('formatBlock', 'h2'); }
    $('#'+e.data.areaId).focus();
  },
  
  h3 = function (e) {
    e.preventDefault();
    if (query('formatBlock') === 'h3') {
      exec('formatBlock', 'p');
    } else { exec('formatBlock', 'h3'); }
    $('#'+e.data.areaId).focus();
  },
    
  addMenu = function ($el, buttons, className, id) {
    
    var buttonsList = buttons.split(",");
    var $menu = $("<div id=" + id + "/>").addClass(className);
  
    if (buttonsList instanceof Array) {
      buttonsList.forEach(function (name, idx, array) {
        var button = "<a href='#' data-type=" + name + ">" + name + "</a>";
        $menu.append(button);
      }, null);
    } else {
      $.error('incorrect argument passed to function addMenu');
    }
    
    return $el.prepend($menu);
  },

  addTextarea = function ($el, className, id, width, height) {
    var $textarea = $("<div id="+ id + "/>")
      .attr('contenteditable', true)
      .addClass(className)
      .css({
	'width': width,
	'height': height
      });

    return $el.append($textarea);
  },
  
  delegateEvents = function ($el, eventsMap, areaId, menuId) {

    for (var selector in eventsMap) {

      var eventMapList = eventsMap[selector];
      eventMapList.forEach(function (eventMap, idx, array) {

	for (var event in eventMap) {

	  var handlers = eventMap[event];
	  handlers.forEach(function (handler, idx, array) {
	    $el.on(event,
		   selector, 
		   {
		     'areaId': areaId,
		     'menuId': menuId
		   },
		   handler);
	  }, null);

	}
      }, null);

    }
  },

  buildEditor = function ($el, options) {
    
    options = $.extend(data, options || {});
    
    addMenu($el, 
	    options.buttons,
	    options.menuClassName,
	    options.menuId);

    addTextarea($el,
		options.areaClassName,
		options.areaId,
		options.width,
		options.height);

    delegateEvents($el, 
		   options.eventsMap,
		   options.areaId,
		   options.menuId);

    return true;
  },
  
  data = {
    
    width: 400,
    height: 400,
    
    buttons: "bold,italic,list,link,large,medium",
    
    areaClassName: 'area',
    
    areaId: 'lwtextarea',

    menuClassName: 'lyvewrite',

    menuId: 'lwmenu',

    eventsMap: {
      '[data-type=bold]'  : [ {'click': [bold]} ],
      '[data-type=italic]': [ {'click': [italic]} ],
      '[data-type=list]'  : [ {'click': [list]} ],
      '[data-type=link]'  : [ {'click': [link]} ],
      '[data-type=large]' : [ {'click': [h2]} ],
      '[data-type=medium]': [ {'click': [h3]}  ],
    }
    
  },


  createButton = function (name, action) {
    //createButton is the only function which mutates state (the data object)
    data.buttons += "," + name;
    var selector = "[data-type=" + name + "]";
    data.eventsMap[selector] = [ {'click': [action]} ];
  };

  $.lyvewrite = {
    'createButton': createButton
  };
  
  $.fn.lyvewrite = function (options) {
    
    return this.each(function (idx, el) {
      buildEditor($el, options, createButton);		     
    });
  };
  
}(jQuery, window, document));
