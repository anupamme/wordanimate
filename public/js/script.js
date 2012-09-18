$(document).ready(function() {
  
  $('#editor')
    .lyvewrite()
    .prepend("<div id='sheet' class='jQuerySheet' style='height: 450px;'></div>")
    .find($('.jQuerySheet'))
    .sheet({
      buildSheet: '5x1',
      urlMenu: 'libs/jquery.sheet/sheets/menu.html'
    })
    .end()
    .append("<div> Some text </div>");
  
});
