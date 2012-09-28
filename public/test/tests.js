
var $el = $('#editor');

test("Editor is content editable", function() {
  ok($el.find('#lwtextarea').attr('contenteditable'), "Passed");
});
