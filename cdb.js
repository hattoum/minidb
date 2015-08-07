var fs = require("fs");
var da = new Date();
var date = (da.getDate())+"-"+(da.getMonth()+1)+"-"+da.getFullYear();
function setdb(name, params,entryname,perm){
	//fs.readFile(name+".json", function(err, data){console.log(err)});
		var lastPerm;
		if (entryname != "") {
			filename = entryname;
		}
		else{
			filename = date
		}
		fs.mkdir("./json/"+name,function(e){
			fs.writeFile("./json/"+name+"/"+filename+".json",params,function(err){
				fs.exists("./json/"+name+"/perm.json",function(itExists,error){
					if(itExists){
						lastPerm = mergeJSON(JSON.parse(fs.readFileSync("./json/"+name+"/perm.json")),perm)
						fs.writeFileSync("./json/"+name+"/perm.json",JSON.stringify(lastPerm))
						
					}else{
						fs.writeFile("./json/"+name+"/perm.json",JSON.stringify( {"Age": "","Telphone": "","DM": "","Hypertension": "","Smoking": ""}),function(){
							lastPerm = mergeJSON(JSON.parse(fs.readFileSync("./json/"+name+"/perm.json")),perm)
							fs.writeFileSync("./json/"+name+"/perm.json",JSON.stringify(lastPerm))
						})
					}
				})
			})
		})

	}
function getdb(name){
	var dirray = fs.readdirSync("json/"+name);
	return dirray;
	
}

function getHistory(name){
	var dirray = fs.readdirSync("json/"+name);
	var history = []
	dirray.forEach(function(entry){
		if(entry!="perm.json"){
			jsonFile = JSON.parse(fs.readFileSync("json/"+name+"/"+entry));
			history.push([entry,jsonFile["Echo"]])
		}
	})
	return history;
}

function mergeJSON(one,two){
	for (i in two) {
		if(two[i] != one[i] && two[i] != ""){
			one[i] = two[i];
		}
	};
	return one
}
exports.getdb = getdb;
exports.setdb = setdb;
exports.getHistory = getHistory;
//setTimeout(console.log(json),9000);