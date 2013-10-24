/*
 * var e = new Event();
 * 只执行一次
 * e.once('type', cb);
 * 每两次执行一次回调
 * e.two('file', cb);
 * 只执行一次，是在第二次调用的时候触发
 * e.twice('file', cb);
 * 常规的，每次都触发
 * e.on('file', cb);
 *
 */

var util = require('./util');

function Event(){
	this._emitTimes = {};
	this._caches = {
		once: {},
		twice: {},
		two: {},
		normal: {}
	};
}

Event.prototype.once = function(eventName, cb){
	var c_once = this._caches.once;
	c_once[eventName] = c_once[eventName] || [];
	c_once[eventName].push(cb);
	return this;
};

Event.prototype.twice = function(eventName, cb){
	var c_twice = this._caches.twice;
	c_twice[eventName] = c_twice[eventName] || [];
	c_twice[eventName].push(cb);
	return this;
}

Event.prototype.two = function(eventName, cb){
	var c_two = this._caches.two;
	c_two[eventName] = c_two[eventName] || [];
	c_two[eventName].push(cb);
	return this;
}

Event.prototype.on = function(eventName, cb){
	var c_normal = this._caches.normal;
	c_normal[eventName] = c_normal[eventName] || [];
	c_normal[eventName].push(cb);
	return this;
}

Event.prototype.emit = function(eventName, args){
	this._emitTimes[eventName] = this._emitTimes[eventName] || 0;
	var count = ++this._emitTimes[eventName],
		self = this;
	
	args = [].constructor.prototype.splice.call(arguments,1);

	if(count == 1){
		this._caches.once[eventName] && this._caches.once[eventName].forEach(function(cb,i){
			cb.apply(self, args);
		});
	}
	else if(count % 2 === 0){
		count === 2 && this._caches.twice[eventName] && this._caches.twice[eventName].forEach(function(cb,i){
			cb.apply(self, args);
		});

		this._caches.two[eventName] && this._caches.two[eventName].forEach(function(cb,i){
			cb.apply(self, args);
		});
	}
	this._caches.normal[eventName] && this._caches.normal[eventName].forEach(function(cb,i){
		cb.apply(self, args);
	});
}

module.exports = Event;
