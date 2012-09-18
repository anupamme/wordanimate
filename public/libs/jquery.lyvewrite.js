
(function($) {
  
  $.fn.lyvewrite = function() {

    return this.each(function() {
      
      $(this)
	.attr('contenteditable', true)
	.css({'height':600, 'width': 800});

    });
    
  };

}(jQuery));
