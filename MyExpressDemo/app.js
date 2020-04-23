var express = require("express");
var app = express();
app.get("/",function(req,res){
	res.send("my first express app");
});

app.get("/r/speak/:pattern", function(req,res){
	var sounds = {
		pig:"oik",
		cat:"meow",
		cow:"moo"
	}
	var name = req.params.pattern.toLowerCase();
	var sound = sounds[name];
	res.send(name+" speaks '"+sound+"'");
	
});

app.get("/r/repeat/:pattern/:time", function(req,res){
	var name = req.params.pattern;
	var times = Number(req.params.time);
	var string = ""
	for(var i=0;i<times;i++){
			string += name+" ";
		};
	res.send(string);
	
});

app.get("*", function(req,res){
	res.send("Error, page not found!")
});

app.listen(3000);