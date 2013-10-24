/*
 * 根据jQuery的Deferred的几个API，进行一个简单的实现，日后完善对CommonJS Promise 规范的实现
 * 
 * 
 * 
 * 
 * 
 */

function Promise(){
	this._caches = [];
}

Promise.prototype.then = function(cb){
	this._caches.push(cb);
	return this;
}

Promise.prototype.fail = function(cb){

	return this;
}

Promise.prototype.done = function(cb){

	return this;
}

Promise.prototype.resolve = function(args){
	if(this._caches.length > 0){
		var cb = this._caches.shift();
		cb.apply(this, args);
	}
	else{
		//throw new Error('no cache any more to call.');
	}
	return this;
}

function Deferred(){
	this.promise = new Promise();
}

Deferred.prototype.resolve = function(args__){
	this.promise.resolve.apply(this.promise, [].constructor.prototype.splice.call(arguments,0));
	return this;
}

module.exports = function(){
	return new Deferred();
};
