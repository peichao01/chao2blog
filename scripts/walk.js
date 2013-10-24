/*
 * walk through directories
 * 
 * usage:
 * 	require('walk')
 * 		.config({ path: 'dir/path', isReadFileContent: true, ignoreHiddenDir: true })
 * 		.on('dir', callback(path,files))
 * 		.on('file', callback(path,data))
 *		.on('end', callback())
 * 		.start();
 * 
 * 
 */
var fs = require('fs'),
	util = require('./util'),
	evt = new require('./Event');

function Walk(){
	this.conf = {
		isReadFileContent: false,
		ignoreHiddenDir: true
	};
	this.entityCount = 0;
}


//var onDir, onFile, onEnd;

Walk.prototype.config = function(config){
	util.extend(this.conf, config);
	return this;
}

Walk.prototype.on = function(eventType, callback){
	if(eventType == 'dir')
		onDir = callback;
	else if(eventType == 'file')
		onFile = callback;
	else if(eventType == 'end')
		onEnd = callback;
	return this;
}

walk.start = function(){
	if(!conf.path){
		throw new Error('use the walk() method to add a directory path to walk.');
		return;
	}

	stat(conf.path);
	
	return this;
}

function stat(path, cb){
	entityCount++;

	if(conf.ignoreHiddenDir){
		var arr = path.trim().split('/'),
			lastEntity = arr.pop();
		if(lastEntity === '') lastEntity = arr.pop();
		if(lastEntity.indexOf('.') === 0) {
			dealEndCallback();
			return;
		}
	}

	fs.stat(path, function(err, stats){
		if(err) throw err;

		if(stats.isFile()){
			if(onFile) {
				if(conf.isReadFileContent){
					fs.readFile(path, {encoding:'utf8'}, function(err, data){
						if(err) throw err;
						onFile(path, data);

						dealEndCallback();
					});
				}
				else{
					onFile(path);

					dealEndCallback();
				}
			}
		}
		else if(stats.isDirectory()){
			fs.readdir(path, function(err, files){
				if(err) throw err;

				if(onDir) onDir(path, files);

				files.forEach(function(fileName, i){
					if(path.lastIndexOf('/') !== path.length - 1) path += '/';
					stat(path + fileName);
				});

				dealEndCallback();
			});
		}
	});
}

function dealEndCallback(){
	entityCount--;
	entityCount === 0 && onEnd && onEnd();
}


module.exports = walk;
