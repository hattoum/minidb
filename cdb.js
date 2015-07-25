var fs = require("fs");
var da = new Date();
var date = (da.getDate())+"-"+(da.getMonth()+1)+"-"+da.getFullYear();
function setdb(name, params,entryname){
	//fs.readFile(name+".json", function(err, data){console.log(err)});
	if (entryname != "") {
		filename = entryname;
	}
	else{
		filename = date
	}
	fs.mkdir("json/"+name,function(e){
   		if(!e || (e && e.code === 'EEXIST')){
        	fs.writeFile("json/"+name+"/"+filename+".json", params, function(err){console.log(err)});
    	} else {
        	//debug
        	console.log(e);
    	}
	});
}
function getdb(name){
	var dirray = fs.readdirSync("json/"+name);
	return dirray;
	
}
exports.getdb = getdb;
exports.setdb = setdb;
//setTimeout(console.log(json),9000);