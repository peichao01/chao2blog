var fs = require('fs');

//var path_article_md = "../tpl/article.md",
//	path_conf_content = "../conf_content.json";
var path_article_md = "./tpl/article.md",
	path_conf_content = "./conf_content.json",
	path_to_write_prefix = './src/';


exports.create = function(articleName){
	var date = new Date(),
		dateStr = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(),
		articleName = dateStr + '-' + articleName;

	fs.stat(path_conf_content, function(err, stats){
		if(err !== null){
			console.log(err);
			return;
		}

		fs.readFile(path_conf_content, {encoding:'utf8'},  function(err, data){
			var conf = JSON.parse(data).article;
			//var conf = typeof data;

			fs.stat(path_article_md, function(err, stats){
				if(err !== null){
					console.log(err);
					return;
				}
			
				fs.readFile(path_article_md, {encoding:'utf8'},  function(err, data){
					var mdContent = data;

					for(var key in conf){
						var val = conf[key],
							reg = new RegExp('(' + key+'\\s*:\\s*).*\(\n)');
						mdContent = mdContent.replace(reg, function(match,sel,sel2){
							return sel + val + sel2;
						});
					}

					//console.log(mdContent);

					var articlePath = path_to_write_prefix + articleName + '.md2';
					fs.writeFile(articlePath, mdContent, {encoding:'utf8'}, function(err){
						if(err === null){
							console.log('创建文章成功：' + articlePath);
						}
						else{
							console.log('创建文章失败：' + articlePath);
						}
					});
				});
			});
		});
		
	});
}
