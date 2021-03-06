var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);
var cdb = require("./cdb.js");
var fs = require("fs");
var path = require("path");
app.use(express.static(__dirname+"/public"));

//\**********Functions******************\//

function mergeJSON(one,two){
	for (i in two) {
		if(i != one[i]){
			one[i] = two[i];
		}
	};

	return one
}

//\**********Functions******************\//

console.log("Remember to check for updates!")

io.on("connection", function(client){

	client.on("clientNewEntry",function(data){
		var newPerm = data.perm;
		delete data.perm;
		var dataStr = JSON.stringify(data);
		var dataEntry = data.EntryName;
		var dataName = data.Name;
		cdb.setdb(dataName, dataStr, dataEntry,newPerm);
		io.emit("done", "Entry Successful");
	});
	client.on("clientQuery", function(data){
		if (fs.existsSync('./json/'+data)) {
  			io.emit("serverQuery", cdb.getdb(data));

		} 
		else{ io.emit("noResults", "No entry with such name")}
	});
	client.on("count",function(data){
		io.emit("countNo",fs.readdirSync("./json").length)
	});
	client.on("list", function(data){
		io.emit("listRep", fs.readdirSync("./json"))
	});
	client.on("visitQuery", function(data){
		try{
			var jsonQuery = JSON.parse(fs.readFileSync("./json/"+data.dir+"/"+data.date));
			io.emit("jsonQuery", jsonQuery);
		}
		catch(err){
			io.emit("jsonQueryFail",null)
		}

	});
	client.on("giffPermData",function(data){
		try{
			var jsonPerm = JSON.parse(fs.readFileSync("./json/"+data+"/perm.json"))
			io.emit("permData",jsonPerm)
		}
		catch(err){
		}
	})
	client.on("getAllPatientsCreate", function(data){
		io.emit("patientsArrayCreate", fs.readdirSync("./json"));
	})
	client.on("getAllPatientsQuery", function(data){
		io.emit("patientsArrayQuery", fs.readdirSync("./json"));
	})
	client.on("getConfig", function(data){
		var jsonConfig = JSON.parse(fs.readFileSync("./config/config.json"));
		io.emit("config", jsonConfig);
	});
	client.on("configChange",function(data){
		fs.writeFileSync("./config/config.json", data);
	})
	client.on("deleteEntry",function(data){
		fs.unlinkSync("./json/"+data[1]+"/"+data[0])
		io.emit("deleteConfirm")
	})
	client.on("giffHistory",function(data){
		try{
			io.emit("history",cdb.getHistory(data))
		}
		catch(err){}
	})
})
server.listen(1337);
var da = new Date();
var date = (da.getDate())+"-"+(da.getMonth()+1)+"-"+da.getFullYear();
console.log("Ready to work....  "+date);