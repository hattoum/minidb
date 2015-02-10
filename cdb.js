var fs = require("fs");
var da = new Date();
var date = (da.getDay()+1)+"-"+(da.getMonth()+1)+"-"+da.getFullYear();
function setdb(name, params){
	//fs.readFile(name+".json", function(err, data){console.log(err)});
	fs.mkdir("json/"+name);
	fs.writeFile("json/"+name+"/"+date+".json", params, function(err){console.log(err)});
}
function getdb(name){
	var dirray = fs.readdirSync("json/"+name);
	return dirray;
	
}
exports.getdb = getdb;
exports.setdb = setdb;
//setTimeout(console.log(json),9000);