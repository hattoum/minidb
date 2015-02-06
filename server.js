var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);
var cdb = require("./cdb.js");
var fs = require("fs");
var path = require("path");
app.use(express.static(__dirname+"/public"));
io.on("connection", function(client){
	client.on("clientNewEntry",function(data){
		console.log("recieved");
		var dataStr = JSON.stringify(data);
		var dataName = data.Name;
		console.log(dataName);
		cdb.setdb(dataName, dataStr);
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
		var jsonQuery = JSON.parse(fs.readFileSync("./json/"+data.dir+"/"+data.date));
		io.emit("jsonQuery", jsonQuery);
		console.log("dun");
	});
	client.on("getAllPatientsCreate", function(data){
		io.emit("patientsArrayCreate", fs.readdirSync("./json"));
	})
	client.on("getAllPatientsQuery", function(data){
		io.emit("patientsArrayQuery", fs.readdirSync("./json"));
	})
})
server.listen(1337);
console.log("Server listening on port 1337")