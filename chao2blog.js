/*
 *
 * usage:
 *	node chao2blog.js create hello-world
 *
 *  node chao2blog.js convert all		#所有文件重新转换，已转换的会被覆盖
 *  node chao2blog.js convert new		#只转换 .html文件不存在的.md2文件
 *  node chao2blog.js convert 15		#只转换当前年份当前月份15号的文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert 9-15		#只转换当前年份9月15号的文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert 13-9-15	#只转换2013年9月15号的文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert 9-x		#只转换当前年份9月的所有文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert 13-9-x	#只转换2013年9月的所有文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert 13-x-x	#只转换2013年的所有文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert >15		#只转换比当前月15号更新的文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert >9-15		#只转换比今年9月15号更新的文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert >13-9-15	
 *  node chao2blog.js convert >13-9-x
 *  node chao2blog.js convert >13-x-x
 *  node chao2blog.js convert <15		#只转换比当前月15号更旧的文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert <9-15		#只转换比今年9月15号更旧的文件，已经转换的也会覆盖，重新转换
 *  node chao2blog.js convert <13-9-15	
 *  node chao2blog.js convert <13-9-x
 *  node chao2blog.js convert <13-x-x
 *
 *
 */

var cmdArgs = require('./scripts/cmd_args').get();
if(cmdArgs.cmd == 'create')
{
	var createArticle = require('./scripts/create_article'),
		articleName = cmdArgs.args[0];

	var error = {
		noName: 'input the NAME of article u want to create.'
	};

	if(!articleName) console.log(error.noName);

	createArticle.create(articleName);
}
else if(cmdArgs.cmd == 'convert')
{
	var path_dirSrc = './src/',
		path_dirTarget = './www/';
	var date = new Date(),
		currentYear = date.getFullYear().toString().substr(2,2),
		currentMonth = date.getMonth() + 1;
	var walk = require('./scripts/walk.js'),
		convertArticle = require('./scripts/convert_article'),
		Event = require('./scripts/Event'),
		evt = new Event();

	//已转换的文件
	var converted = [],
		sources = [];
	walk.config({
		path: path_dirTarget,
		isReadFileContent: false
	}).on('file',function(path){
		converted.push(path);
		console.log('target file:' + path);
	}).on('end', function(){
		evt.emit('filesReaded');
		//console.log(converted);
		console.log('target dir end');
	}).start();

	/*
	walk.config({
		path: path_dirSrc,
		isReadFileContent: false
	}).on('file',function(path){
		sources.push(path);
	}).on('end', function(){
		evt.emit('filesReaded');
		//console.log(sources);
		console.log('source dir end');
	}).start();
	*/

	evt.twice('filesReaded', function(){
		//console.log(converted);
		//console.log(sources);
	});
	
}
