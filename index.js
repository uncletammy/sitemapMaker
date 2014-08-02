
var _ = require('lodash');
var fs = require('fs-extra');

var allTemplateObjects = [];
var allTheItems = '';



// JSMenu and File Location Variables
var jsBaseMenu = '/home/dude/node/Sails_Website_Stuff/www.sailsjs.org/assets/templates/jsmenus/';
var jsMenus = [jsBaseMenu+'anatomy.jsmenu',jsBaseMenu+'concepts.jsmenu',jsBaseMenu+'reference.jsmenu'];
var webUrlPrefix = 'http://sailsjs.org/#/documentation/';
var writeFileHere = process.cwd()+'/sitemap.xml';

// XML Output Variables
var startOfFile = '<?xml version="1.0" encoding="utf-8"?>\n'+
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

var useEachItem = '\t<url>\n\t\t<loc>'+'B==D'+'</loc>\n\t</url>\n';

var endOfFile = '</urlset>';


var parseFile = function(fileName){
	try {

		var file = fs.readFileSync(fileName,'utf-8');
		return JSON.parse(file);
	} catch(byah){
		console.log('Error converting mongooutput file to object:',byah)
		return false;
	}
};

_.each(jsMenus,function(oneMenuPath,keyName){
	_.each(parseFile(oneMenuPath),function(oneObject){

		var pathArgs = oneObject.fullPathAndFileName.replace('.html','').split('/');
		var lastArg = pathArgs[pathArgs.length-1];
		var secondLast = pathArgs[pathArgs.length-2];

		// if this is an overview file, cut off the last argument
		if (lastArg === secondLast){
			var addOneItem = useEachItem.replace('B==D',webUrlPrefix+oneObject.fullPathAndFileName.replace('/'+lastArg+'.html',''));
		} else {
			var addOneItem = useEachItem.replace('B==D',webUrlPrefix+oneObject.fullPathAndFileName);
			// var allTheItems = allTheItems+;
		}
		allTheItems = allTheItems+addOneItem;
	})
});


var datFile = startOfFile+allTheItems+endOfFile;



fs.outputFile(writeFileHere,datFile,function(err){
	if (err) return 'Shits broke:'+err
	
	console.log('Sitemap written at',writeFileHere)
})

