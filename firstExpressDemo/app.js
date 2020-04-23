//console.log("hello")

var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.send("hello");
});

app.get("/bye",function(req,res){
	console.log("someone has made a request in /bye");
	res.send("goodbye!");
	console.log("see you");
});

app.get("*",function(req,res){
	
	res.send("Error, page not found!");
	
});

app.listen(3000,function(){
	console.log("server has started!")
});

