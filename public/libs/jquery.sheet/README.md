jQuery.sheet is an intuitive javascript toolkit & jQuery plugin. It provides users with an easy way of making spreadsheets available in their applications.
			
jQuery.sheet uses simple html table objects, they can be grouped together to make a spreadsheet with multiple sheets. Sheets are calculated into a spreadsheet using simple javascript in an efficient manner.
			
Formulas are calculated using the "formula" attribute of each html td object.			

Sheet supports xml, json, and html exporting and importing for sheets.			

On initiation jQuery.sheet creates the sheet object and stores it in jQuery.sheet.instance[] and as well in the jQuery dom object as "sheetInstance".

Initialization Options:

Option	Description	Default Value	Type	Accepted Values

urlGet:	local url,
	if you want to get a sheet from a url
	sheets/enduser.documentation.html
	string	
	
urlSave: local url,
	for use only with the default save for sheet
	save.html
	string
	
editable: bool,
	Makes the jSheetControls_formula & jSheetControls_fx appear
	true
	bool	
	
urlMenu: local url,
	for the menu to the right of title
	menu.html
	string	
	
NewColumnWidth: the width of new columns or columns that have no width assigned	
	120
	int	
	
title:	general title of the sheet group
	null
	string / object / function	
	
inlineMenu: menu for editing sheet
	null
	string / object / function	
	
buildSheet: false
	bool / string / object	
	bool true - build sheet inside of parent bool false - use urlGet from local url string - '{number_of_cols}x{number_of_rows} (like 5x100) object - table
	
calcOff: turns calculationEngine off (no spreadsheet, just grid)
	false
	bool	
	
log:	turns some debugging logs on (jS.log('msg'))
	false
	bool	
	
lockFormulas: turns the ability to edit any formula off
	false
	bool	
	
parent: sheet's parent, DON'T CHANGE
	jQuery(this)
	object	
	
colMargin: the height and the width of all bar items, and new rows
	18
	int
	
fnBefore: fires just before jQuery.sheet loads
	function() {}
	function	
	
fnAfter: fires just after all sheets load
	function() {}
	function	
	
fnSave:	default save function, more of a proof of concept
	function() { jS.saveSheet(); }
	function	
	
fnOpen:	by default allows you to paste table html into a javascript prompt for you to see what it looks likes if you where to use sheet	function() { var t = prompt('Paste your table html here'); if (t) { jS.openSheet(t); } }	function	
fnClose	default close function, more of a proof of concept
	function() {}
	function	
	
fnAfterCellEdit: fires just after someone edits a cell
	function() {}
	function	
	
joinedResizing:	this joins the column/row with the resize bar
	false	
	bool	
	
boxModelCorrection: attempts to correct the differences found in heights and widths of different browsers, if you mess with this, get ready for the must upsetting and delacate js ever
	2
	int	
	
showErrors: will make cells value an error if spreadsheet function isn't working correctly or is broken
	true
	bool	
	
calculations: used to extend the standard formulas that come with sheet
	{}
	object	
	
cellSelectModel: Excel sets the first cell onmousedown active, openoffice sets the last, now you can choose how you want it to be ;)
	excel	
	string	excel, oo, gdocs
	
autoAddCells: Automatically adds new cells if set to true when you press down or tab at the last cell in the row or column
	true
	bool	
	
caseInsensitive: Make cells and formulas not sensitive to case, you can use SUM(A1) or sum(a1)
	false
	bool	
			
