var Walk = require('./Walk'),
	Deferred = require('./Deferred');

var dfd = new Deferred();

Walk().config({
		isReadFileContent: true,
		path:'./test'
	})
	.on('file', function(path,data){
		console.log('file: ' + path + '  ---  ' + data);
	})
	.on('dir', function(path,files){
		console.log('dir: ' + path);
	})
	.on('end', function(){
		console.log('end');
		dfd.resolve();
	})
	.start();

	dfd.promise.then(function(){
		console.log('2 start');
		setTimeout(function(){
			console.log('2 end');
			dfd.resolve();
		}, 2000);
		return dfd.promise;
	})
	.then(function(){
		console.log('3 start');

		///*
		Walk().config({
			path:'./test'
		})
		.on('file', function(path){
			console.log(path);
		})
		.on('end', function(){
			console.log('3 end');
			dfd.resolve();
		})
		.start();
		//*/
		/*
		setTimeout(function(){
			console.log('3 end');
			dfd.resolve();
		}, 1000);
		*/

		return dfd.promise;
	})
	.then(function(){
		console.log('4 start');
		setTimeout(function(){
			console.log('4 end');
		}, 1000);
	});
