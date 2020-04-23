var express = require("express");
var app = express();
var bodyparser = require("body-parser");

var campgroundsVar = [
		{name:"Salmon Creek", image:"https://storage.googleapis.com/ehimages/2019/11/24/img_daa4bd15596db13a41ab852354f00d4f_1574572660665_processed_original.jpg"},
		{name:"Granite Hill",		 image:"https://m.ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697"},
	{name:"Salmon Creek", image:"https://storage.googleapis.com/ehimages/2019/11/24/img_daa4bd15596db13a41ab852354f00d4f_1574572660665_processed_original.jpg"},
		{name:"Granite Hill",		 image:"https://m.ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697"},
	{name:"Salmon Creek", image:"https://storage.googleapis.com/ehimages/2019/11/24/img_daa4bd15596db13a41ab852354f00d4f_1574572660665_processed_original.jpg"},
		{name:"Granite Hill",		 image:"https://m.ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697"}
	
	];

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	//res.send("home page will be landed soom....");
	res.render("home");
});

app.get("/campgrounds",function(req,res){
//res.send("this is campgrounds page")
	res.render("campgrounds",{campgrounds:campgroundsVar});
});

app.post("/campgrounds",function(req,res){
	//res.send("you reach the post route")
	//get data from form and add it to the campgroundsVar array
	var name = req.body.name;
	var image = req.body.url;
	var newCampground = {name:name,image:image};
	campgroundsVar.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});


app.listen(3000,function(){
	console.log("The YelpCamp server has started!")
});