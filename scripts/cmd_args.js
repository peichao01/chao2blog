var args = process.argv;

var mapedArgs = {};

mapedArgs.appName = args.shift();
mapedArgs.scriptName = args.shift();
mapedArgs.cmd = args.shift();
mapedArgs.args = args;

exports.get = function(){
	return mapedArgs;
}
