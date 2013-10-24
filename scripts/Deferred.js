function Promise(){

}

Promise.prototype.then = function(cb){

}

Promise.prototype.fail = function(cb){

}

Promise.prototype.done = function(cb){

}

function Deferred(){
	this.promise = new Promise();
}

Deferred.prototype.resolve = function(){

}

module.exports = Deferred;
