/*
 * walk through directories
 * 
 * usage:
 * 	var Walk = require('walk');
 *	Walk()
 * 		.config({ path: 'dir/path', isReadFileContent: true, ignoreHiddenDir: true })
 * 		.on('dir', callback(path,files))
 * 		.on('file', callback(path,data))
 *		.on('end', callback())
 * 		.start();
 * 
 * 
 * 
 */
var fs = require('fs'),
	util = require('./util'),
	Event = require('./Event');
	//Deferred = require('./Deferred');

function Walk(){
	this.conf = {
		isReadFileContent: false,
		ignoreHiddenDir: true,
		debug: false
	};
	this.entityCount = 0;
	this.event = new Event();
	//this.dfd = new Deferred();
	//return new Walk();
}

Walk.prototype.config = function(config){
	util.extend(this.conf, config);
	return this;
}

Walk.prototype.on = function(eventType, callback){
	this.event.on(eventType, callback);
	return this;
}

Walk.prototype.start = function(){
	if(!this.conf.path){
		throw new Error('use the walk() method to add a directory path to walk.');
		return this;
	}

	return this._stat(this.conf.path);
}

Walk.prototype._stat = function(path){
	if(this.conf.debug) console.log(path);
	var self = this;

	this.entityCount++;

	if(this.conf.ignoreHiddenDir){
		var arr = path.trim().split('/'),
			lastEntity = arr.pop();
		if(lastEntity === '') lastEntity = arr.pop();
		if(lastEntity.indexOf('.') === 0) {
			this._dealEndCallback();
			return;
		}
	}

	fs.stat(path, function(err, stats){
		if(err) throw err;

		if(stats.isFile()){
			if(self.conf.isReadFileContent){
				fs.readFile(path, {encoding:'utf8'}, function(err, data){
					if(err) throw err;
					self.event.emit('file', path, data);//onFile(path, data);

					self._dealEndCallback();
				});
			}
			else{
				self.event.emit('file', path);//onFile(path);

				self._dealEndCallback();
			}
		}
		else if(stats.isDirectory()){
			fs.readdir(path, function(err, files){
				if(err) throw err;

				self.event.emit('dir', path, files);//if(onDir) onDir(path, files);

				files.forEach(function(fileName, i){
					if(path.lastIndexOf('/') !== path.length - 1) path += '/';
					self._stat(path + fileName);
				});

				self._dealEndCallback();
			});
		}
	});
	return this;
}

Walk.prototype._dealEndCallback = function(){
	this.entityCount--;
	this.entityCount === 0 && this.event.emit('end');
	return this;
}


module.exports = function(){
	return new Walk();
};
