var fs = require("fs");
function setdb(name, params){
	//fs.readFile(name+".json", function(err, data){console.log(err)});
	fs.writeFile("json/"+name+".json", params, function(err){console.log(err)});
}
function getdb(name){
	return JSON.parse(fs.readFileSync("json/"+name+".json","utf8"))
	
}
exports.getdb = getdb;
exports.setdb = setdb;
//setTimeout(console.log(json),9000);