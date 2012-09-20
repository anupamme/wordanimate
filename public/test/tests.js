
var $el = $('#editor');

test("Editor is content editable", function() {
  ok($el.attr('contenteditable'), "Passed");
});
