var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friends = ['lucy','justin','peter','anna'];

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.get('/',function(req,res){
	res.render('home');
});

app.get('/friends',function(req,res){
	// var friends = ['lucy','justin','peter','anna'];
	res.render('friends',{friendsVar:friends});
});

app.post('/addfriend',function(req,res){
	// console.log(req.body);
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	// res.send("you reach the post route");
	res.redirect("friends");
});

app.listen(3000,function(){
	console.log("server is connected...")
});