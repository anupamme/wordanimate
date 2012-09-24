(function ($) {
  
  var left = function(e) {
    e.preventDefault();
    document.execCommand('justifyLeft');
    $('#'+e.data.areaId).focus();
  };

  var center = function(e) {
    e.preventDefault();
    document.execCommand('justifyCenter');
    $('#'+e.data.areaId).focus();
  };

  var right = function(e) {
    e.preventDefault();
    document.execCommand('justifyRight');
    $('#'+e.data.areaId).focus();
  };

  $.lyvewrite.createButton('left', left);
  $.lyvewrite.createButton('center', center);
  $.lyvewrite.createButton('right', right);
  
}(jQuery));
