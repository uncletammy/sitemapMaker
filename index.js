

var _ = require('lodash');
var fs = require('fs-extra');

var jsBaseMenu = '/home/dude/node/Sails_Website_Stuff/www.sailsjs.org/assets/templates/jsmenus/';
var jsMenus = [jsBaseMenu+'anatomy.jsmenu',jsBaseMenu+'concepts.jsmenu',jsBaseMenu+'reference.jsmenu'];

var allTemplateObjects = [];

var parseFile = function(fileName){
	try {

		var file = fs.readFileSync(fileName,'utf-8');
		return JSON.parse(file);
		// file = f.replace(/\n/ig,',\n');

		// file = f.replace(/ \} \},\{/ig,' } }\n{ ');//.replace(/ \} \}\n\{/ig,'ENDOFSHITBALLSFUCK').replace(/\n/ig,'').replace(/ENDOFSHITBALLSFUCK/ig,'}}\n');
	} catch(byah){
		console.log('Error converting mongooutput file to object:',byah)
		return false;
	}
};

_.each(jsMenus,function(oneMenuPath,keyName){
	var thisJsMenu = parseFile(oneMenuPath);
	// console.log(thisJsMenu)
	console.log('There are',thisJsMenu.length,'items in',keyName)
})

