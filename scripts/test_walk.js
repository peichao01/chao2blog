var walk = require('./walk');

walk.config({
		isReadFileContent: true,
		path:'./test'
	})
	.on('end', function(){
		console.log('end');
	})
	.on('file', function(path,data){
		console.log('file: ' + path + '  ---  ' + data);
	})
	.on('dir', function(path,files){
		console.log('dir: ' + path);
	})
	.start();
