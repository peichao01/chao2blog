var Deferred = require('./Deferred');

var dfd = Deferred();

function f1(){
	console.log('f1 start');

	setTimeout(function(){
		console.log('f1 done');
		dfd.resolve();
	}, 2000);

	return dfd.promise;
}

function f2(){
	console.log('f2 start');

	setTimeout(function(){
		console.log('f2 done');
		dfd.resolve();
	}, 2000);

	return dfd.promise;
}

function f3(){
	console.log('f3 start');

	setTimeout(function(){
		console.log('f3 done');
		dfd.resolve();
	}, 2000);

	return dfd.promise;
}

f1().then(f2).then(f3);
