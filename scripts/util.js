exports.extend = function(reciever, map, isRewriteSameProperty){
	if(arguments.length < 2) throw new Error('u must input a extend map.');
	var hasArgLast = typeof arguments[arguments.length  - 1] === 'boolean';
	isRewriteSameProperty = hasArgLast ? isRewriteSameProperty : true;
	var maps = [].constructor.prototype.splice.call(arguments, 1, arguments.length - (hasArgLast ? 2 : 1));
	maps.forEach(function(map, i){
		for(var key in map){
			if(map.hasOwnProperty(key) && (isRewriteSameProperty || !reciever.hasOwnProperty(key))){
				reciever[key] = map[key];
			}
		}
	});
	return reciever;
}

exports.each = function(o, cb){
	for(var key in o){
		if(o.hasOwnProperty(key)){
			cb(o[key], key);
		}
	}
}
